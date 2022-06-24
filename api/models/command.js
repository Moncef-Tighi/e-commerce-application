import db from "./postGreSql.js";
import QueryPostGre from "../util/query.js";

export const readAllCommandes = async function(param) {
    const query= new QueryPostGre("-id_commande")
    if (param.code_article) {
        param["article.code_article"]=param.code_article;
        delete param.code_article;
    }

    const sql = `
    SELECT id_commande, article.code_article, quantite, prix_vente, marque, nom_client, prenom_client
    adresse, numero_client, email_client
    FROM commande
    INNER JOIN article ON article.code_article = commande.code_article
    ${query.where(param)}
    GROUP BY article.code_article, id_commande
    ${query.sort(param)}
    ${query.paginate(param)}
    `

    const response = await db.query(sql, query.sanitize())

    return response.rows;

}

export const readOneCommande = async function(id_commande) {

    const sql = `
        SELECT id_commande, article.code_article, quantite, prix_vente, marque, nom_client, prenom_client
        adresse, numero_client, email_client
        FROM commande
        INNER JOIN article ON article.code_article = commande.code_article
        WHERE id_commande = '${id_commande}'
        GROUP BY article.code_article, id_commande
        `

    const response = await db.query(sql)
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

