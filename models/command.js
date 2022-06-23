import db from "./postGreSql.js";
import QueryPostGre from "../util/query.js";

export const readAllCommandes = async function(param) {
    const query= new QueryPostGre("-date_ajout")
    if (param.code_article) {
        param["article.code_article"]=param.code_article;
        delete param.code_article;
    }

    const sql = `
        SELECT article.code_article, prix_vente, libelle, marque, gender, array_agg(taille) as "taille"  
        , date_ajout,date_modification
        FROM article 
        INNER JOIN taille_article ON article.code_article=taille_article.code_article
        INNER JOIN tailles ON taille_article.id_taille = tailles.id_taille
        ${query.where(param)}
        GROUP BY article.code_article
        ${query.sort(param)}
        ${query.paginate(param)}
        `

    const response = await db.query(sql, query.sanitize())

    return response.rows;

}

export const createCommande = async function(code_article, prix_vente, libelle, marque, gender) {

    const sql = `
    INSERT INTO article(code_article, prix_vente, libelle, marque, gender) VALUES
    ($1, $2,$3,$4,$5)
    RETURNING *
    `
    const values = [code_article, prix_vente, libelle, marque, gender];
    const response = await db.query(sql, values)
    return response.rows[0];

}

export const updateArticle = async function(code_article, prix_vente, libelle, marque, gender) {

    const sql = `
    UPDATE article SET
    prix_vente = $2 libelle=$3 marque=$4 gender=$5 
    WHERE code_article=$1
    RETURNING *
    `
    const values = [code_article, prix_vente, libelle, marque, gender];
    const response = await db.query(sql, values)
    return response.rows[0];

}


