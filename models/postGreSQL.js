import pg from "pg";

const {Pool} = pg;
const db= new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT, 
})
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connexion à la base de donnée de la plateforme réussie.");
    }
})

export default db;

  

