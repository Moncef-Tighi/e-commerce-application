import {Button} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import classes from './ListeArticle.module.css';
import { useNavigate } from 'react-router-dom';

function InsertionArticle({taille, deselectionHadeler}) {
    const navigate = useNavigate();
    const AddArticle = function() {
        navigate("ajouter")
    }
    return (<aside className={classes.aside}>
              <p>{taille} articles sélectionnés</p>
              <div>    
                  <Button color='primary' sx={{
                    maginRight: "25px"
                }} onClick={deselectionHadeler}>
                      Tout Déselectionner
                  </Button>    
                  <Button variant="contained" size='small' startIcon={<AddCircleOutlineIcon />}
                  onClick={AddArticle}>
                      Ajouter un article
                  </Button>
              </div>
          </aside>);
  }

export default InsertionArticle