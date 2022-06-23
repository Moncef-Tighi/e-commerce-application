import db from "./postGreSql.js";
import QueryPostGre from "../util/query.js";

export const readAllArticles = async function(param) {
    const query= new QueryPostGre("-date_ajout")
    if (param.code_article) {
        param["article.code_article"]=param.code_article;
        delete param.code_article;
    }
    const sql = `
        SELECT article.code_article,prix_initial, prix_vente, libelle, marque, gender,division, silhouette
        ,SUM(stock_dimension) as "stock", array_agg(dimension) as "dimension"  
        , date_ajout,date_modification, description, id_article_wooCommerce 
        FROM article 
        INNER JOIN article_taille ON article.code_article=article_taille.code_article
        ${query.where(param)}
        ${query.sort(param)}
        ${query.paginate(param)}
        `

    const response = await db.query(sql, query.sanitize())

    return response.rows;

}
