import { Button, TextField, NativeSelect } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import classes from './Article.module.css';
import { useState } from "react";
import {Search} from '@mui/icons-material';
import { InputAdornment } from "@mui/material";
import ListeCommande from "../components/ListeCommande";

const Article = function(props) {
    const [query, setQuery] = useState("");
    const [sortBy] = useState("");
    const navigate= useNavigate();

    const basicSearch= function(event) {
        event.preventDefault();
        const {select, recherche}= event.currentTarget.elements
        setQuery(()=> {return {
            key : recherche.value ? `${select.value}[like]` : ` `,
            value :  recherche.value || ' '
        }})
    }

    return (
        <>
            <aside style={{marginBottom: "25px"}}>
                <form className={classes.form} onSubmit={basicSearch}>
                    <NativeSelect id="select" variant='outlined'>
                       <option value="code_article">Code Article</option>
                        <option value="marque">Marque</option>
                        <option value="nom_client">Nom client</option>
                        <option value="prenom_client">Prenom client</option>

                    </NativeSelect>
                    <TextField id='recherche' size="small" variant="outlined" sx={{display: "block", marginLeft: "10px", width:"100%"}} 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Search />
                            </InputAdornment>
                        ),
                        }}
                    >
                    </TextField>
                    <Button color="primary" size="small" variant="contained" type="submit">
                        Rechercher
                    </Button>
                </form>
            </aside>

        <ListeCommande query={query} sortBy={sortBy} />


        </>  
        )
}

export default Article