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
        INNER JOIN taille_article ON article.code_article=taille_article.code_article
        INNER JOIN tailles ON taille_article.id_taille = tailles.id_taille
        ${query.where(param)}
        ${query.sort(param)}
        ${query.paginate(param)}
        `

    const response = await db.query(sql, query.sanitize())

    return response.rows;

}
