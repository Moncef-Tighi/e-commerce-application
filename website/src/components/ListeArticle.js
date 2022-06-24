import classes from './ListeArticle.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {TableBody, TableCell, TableRow,Checkbox} from '@mui/material'

import TableCustom from "./Table/TableCustom";
import TableHeadCustom from "./Table/TableHeadCustom";
import useGet from "../hooks/useGet";
import useTable from "../hooks/useTable";
import useSelection from '../hooks/useSelection.js';
import InsertionArticle from './InsertionArticle';

const emptyTable= {
    body: [],
    totalSize: 0,
    page : 1
}

const ListeArticle = function(props) {

    const {url, handleChangePage,sortHandeler} = useTable(props.query);
    const {data: tableData, loading, error} = useGet(`http://localhost:4000/api/v1/articles?${url}`, emptyTable);
    const article = tableData.body
    const {selection, selectionHandeler, deselectionHadeler}=useSelection("");


    console.log(article);
    const header = [
        { name: "", sort: false},
        { name: "Code Article", sort: false},
        { name: "Libelle", sort: false},
        { name: "Marque", sort: true, trueName : "marque"},
        { name: "Gender", sort: true, trueName : "gender"},
        { name: "Date Ajout", sort: true , trueName : "date_ajout"},
        { name: "Prix de vente", sort: true , trueName : "prix_vente"} ,
    ]

    const isSelected = (row) => {if (selection) return row.code_article in selection};
    if (selection) var taille = Object.keys(selection).length
    else var taille = 0
    return (

        <>
        {error ? <aside className={classes.error}>{error}</aside>: "" }
        <InsertionArticle   taille={taille} deselectionHadeler={deselectionHadeler}  />        
        {article.length===0 && !loading ?<div>Aucun article n'a été trouvé</div> : ""}
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
            {article?.map((row) => {
                const isItemSelected= isSelected(row)
                return (
                <TableRow
                key={row.code_article}
                aria-checked={isItemSelected}
                selected={isItemSelected}
                >
                <TableCell padding="checkbox" >
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onClick={(event) => selectionHandeler(event, row)}
                    inputProps={{
                    'article': row.code_article,
                    }}
                />
                </TableCell>            

                <TableCell component="th" scope="row">
                <Link to={`${row.code_article}`}>{row.code_article}</Link>
                </TableCell>
                <TableCell align="left">{row.libelle?.toLowerCase()}</TableCell>
                <TableCell align="left" >{row.marque}</TableCell>
                <TableCell align="left" >{row.gender || ""}</TableCell>
                <TableCell align="center" >{moment(Date.parse(row.date_ajout)).fromNow()}</TableCell>
                <TableCell align="center" >{row.prix_vente}</TableCell>

            </TableRow>)})}
        </TableBody>
        </TableCustom>


        </>
    )
}


  export default ListeArticle