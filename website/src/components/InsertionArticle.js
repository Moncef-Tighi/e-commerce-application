import {Button} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import classes from './ListeArticle.module.css';

function InsertionArticle({taille, deselectionHadeler}) {
    return (<aside className={classes.aside}>
              <p>{taille} articles sélectionnés</p>
              <div>    
                  <Button color='primary' sx={{
                    maginRight: "25px"
                }} onClick={deselectionHadeler}>
                      Tout Déselectionner
                  </Button>    
                  <Button variant="contained" size='small' startIcon={<AddCircleOutlineIcon />}>
                      Ajouter un article
                  </Button>
              </div>
          </aside>);
  }

export default InsertionArticle