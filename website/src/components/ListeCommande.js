import classes from './ListeArticle.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {TableBody, TableCell, TableRow,Checkbox} from '@mui/material'

import TableCustom from "./Table/TableCustom";
import TableHeadCustom from "./Table/TableHeadCustom";
import InsertionArticle from "./InsertionArticle.js"
import useGet from "../hooks/useGet";
import useTable from "../hooks/useTable";
import useSelection from '../hooks/useSelection.js';

const emptyTable= {
    body: [],
    totalSize: 0,
    page : 1
}

const ListeCommande = function(props) {

    const {url, handleChangePage,sortHandeler} = useTable(props.query);
    const {data: tableData, loading, error} = useGet(`http://localhost:4000/api/v1/commandes?${url}`, emptyTable);
    const commande = tableData.body
    const {selection, selectionHandeler, deselectionHadeler}=useSelection("");

    const header = [
        { name: "", sort: false},
        { name: "Numero commande", sort: true, trueName: "id_commande"},
        { name: "Code Article", sort: false},
        { name: "Marque", sort: true, trueName : "marque"},
        { name: "quantite", sort: false},
        { name: "Prix de vente", sort: true , trueName : "prix_vente"} ,
        { name: "Nom", sort: true, trueName : "nom_client"},
        { name: "Prenom", sort: true , trueName : "prenom_client"},
        { name: "Adresse", sort: true, trueName : "adresse"},
        { name: "Numero", sort: true , trueName : "numero_client"},
        { name: "Email", sort: true , trueName : "email_client"},
    ]

    const isSelected = (row) => {if (selection) return row.code_article in selection};
    if (selection) var taille = Object.keys(selection).length
    else var taille = 0
    return (

        <>
        {error ? <aside className={classes.error}>{error}</aside>: "" }
        {commande.length===0 && !loading ?<div>Aucun article n'a été trouvé</div> : ""}
        <TableCustom
            tableData={tableData.body}
            totalSize={tableData.totalSize}
            page={tableData.page}
            handleChangePage={handleChangePage}
            loading={loading}
            sx={{
            boxShadow: "#3c40434d 0px 1px 2px 0px,#3c404326 0px 1px 3px 1px"}}
        >
        <TableHeadCustom header={header} sortHandeler={sortHandeler}/>

        <TableBody>
            {commande?.map((row) => {
                const isItemSelected= isSelected(row)
                return (
                <TableRow
                key={row.id_commande}
                aria-checked={isItemSelected}
                selected={isItemSelected}
                >
                <TableCell padding="checkbox" >
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onClick={(event) => selectionHandeler(event, row)}
                    inputProps={{
                    'article': row.id_commande,
                    }}
                />
                </TableCell>            

                <TableCell component="th" scope="row">
                <Link to={`${row.id_commande}`}>{row.id_commande}</Link>
                </TableCell>
                <TableCell align="left">
                <Link to={`/article/${row.code_article}`}>{row.code_article}</Link>
                </TableCell>
                <TableCell align="left" >{row.marque}</TableCell>
                <TableCell align="left" >{row.quantite}</TableCell>
                <TableCell align="center" >{row.prix_vente}</TableCell>
                <TableCell align="center" >{row.nom_client}</TableCell>
                <TableCell align="center" >{row.prenom_client}</TableCell>
                <TableCell align="center" >{row.adresse}</TableCell>
                <TableCell align="center" >{row.numero_client}</TableCell>
                <TableCell align="center" >{row.email_client}</TableCell>


            </TableRow>)})}
        </TableBody>
        </TableCustom>


        </>
    )
}


  export default ListeCommande