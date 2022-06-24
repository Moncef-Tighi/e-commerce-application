import db from "./postGreSql.js";
import QueryPostGre from "../util/query.js";

export const readAllArticles = async function(param) {
    const query= new QueryPostGre("-date_ajout")
    if (param.code_article) {
        param["article.code_article"]=param.code_article;
        delete param.code_article;
    }

    const sql = `
        SELECT article.code_article, prix_vente, libelle, marque, gender, array_agg(taille) as "taille"  
        , date_ajout,date_modification
        FROM article 
        LEFT JOIN taille_article ON article.code_article=taille_article.code_article
        LEFT JOIN tailles ON taille_article.id_taille = tailles.id_taille
        ${query.where(param)}
        GROUP BY article.code_article
        ${query.sort(param)}
        ${query.paginate(param)}
        `

    const response = await db.query(sql, query.sanitize())

    return response.rows;

}

export const readOneArticle = async function(code_article) {
    
    const sql = `
        SELECT article.code_article, prix_vente, libelle, marque, gender, array_agg(taille) as "taille"  
        , date_ajout,date_modification
        FROM article 
        LEFT JOIN taille_article ON article.code_article=taille_article.code_article
        LEFT JOIN tailles ON taille_article.id_taille = tailles.id_taille
        WHERE article.code_article = '${code_article}'
        GROUP BY article.code_article
        `

    const response = await db.query(sql)
    return response.rows;
}


export const createArticle = async function({code_article, prix_vente, libelle, marque, gender}) {
    const sql = `
    INSERT INTO article(code_article, prix_vente, libelle, marque, gender) VALUES
    ($1, $2,$3,$4,$5)
    RETURNING *
    `
    const values = [code_article, prix_vente, libelle, marque, gender];
    const response = await db.query(sql, values)
    return response.rows[0];

}

export const updateArticle = async function({code_article, prix_vente, libelle, marque, gender}) {
    const sql = `
    UPDATE article SET
    prix_vente = $1, libelle=$2, marque=$3, gender=$4 
    WHERE code_article= '${code_article}'
    RETURNING *
    `
    const values = [prix_vente, libelle, marque, gender];
    const response = await db.query(sql, values)
    return response.rows[0];

}


