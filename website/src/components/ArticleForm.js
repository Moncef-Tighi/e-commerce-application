import useGet from "../hooks/useGet"
import { useParams } from "react-router-dom";
import classes from './ArticleForm.module.css';
import { Box } from "@mui/system";
import { InputLabel, OutlinedInput, Button } from "@mui/material";
import Notification from "../Util";
import { useState } from "react";
import axios from "axios";

const ArticleForm = function() {
    let { code_article } = useParams();
    if (code_article) {
        var url =`http://localhost:4000/api/v1/articles/${code_article}`
    }
    const {data: article} = useGet(url || "");
    console.log(article);

    const [openNotif, setNotif] = useState("");
    const closeNotif = (event, reason) => {
        setNotif("");
    };

    const formSubmitHandeler =async  function(event) {
        event.preventDefault();

        const {code_article: code, prix_vente, marque, gender ,libelle}= event.currentTarget?.elements
        const data = {
            article : {
                code_article : code.value,
                prix_vente : prix_vente.value,
                marque : marque.value,
                gender : gender.value,
                libelle : libelle.value,
            }
        }
        console.log(data);
        try {
            if (code_article) {
                await axios.put(`http://localhost:4000/api/v1/articles/`, data)    
            }else {
                await axios.post(`http://localhost:4000/api/v1/articles/`, data)
            }
            setNotif("L'Article a bien été ajouté");
        } catch(error) {
            console.log(error);
            console.log(error.code);
        }
    }



    return (
            <>

                <Box className={classes.page}>
                    <h1>Modifier un Article</h1>
                    <form onSubmit={formSubmitHandeler}> 

                        <InputLabel htmlFor="code_article">Code article</InputLabel>
                        <OutlinedInput id='code_article' color='primary' size='small' fullWidth={true} required
                        defaultValue={article?.body[0]?.code_article} key={article?.body[0]?.code_article+'code_article'}  />
                        <InputLabel htmlFor="prix_vente">Prix de vente</InputLabel>
                        <OutlinedInput id='prix_vente' color='primary' size='small' fullWidth={true} required
                        defaultValue={article?.body[0]?.prix_vente} key={article?.body[0]?.prix_vente+'prix_vente'} />
                        <InputLabel htmlFor="marque">Marque</InputLabel>
                        <OutlinedInput id='marque' color='primary' size='small' fullWidth={true} required
                        defaultValue={article?.body[0]?.marque} key={article?.body[0]?.marque+'marque'} />
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <OutlinedInput id='gender' color='primary' size='small' fullWidth={true} required
                        defaultValue={article?.body[0]?.gender} key={article?.body[0]?.gender+'gender'} />
                        <InputLabel htmlFor="libelle">Libelle</InputLabel>
                        <OutlinedInput id='libelle' color='primary' size='small' fullWidth={true} required
                        defaultValue={article?.body[0]?.libelle} key={article?.body[0]?.libelle+'libelle'} />
                    <div className={classes.flex}>
                    <Button color="primary" variant="contained" fullWidth={true}
                    size="large" type="submit">
                    Confirmer</Button>
                    </div>
                </form>                
            </Box>

            <Notification closeNotif={closeNotif} message={openNotif} status="success"  />

            </>
        )
}

export default ArticleForm