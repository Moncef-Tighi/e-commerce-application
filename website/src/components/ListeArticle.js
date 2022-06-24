import classes from './ListeArticle.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {TableBody, TableCell, TableRow,Checkbox} from '@mui/material'

import TableCustom from "../Table/TableCustom";
import TableHeadCustom from "../Table/TableHeadCustom";
import InsertionArticle from "./InsertionArticle.js"
import useGet from "../../hooks/useGet";
import useTable from "../../hooks/useTable";
import useSelection from '../../hooks/useSelection.js';

import { capitalize, numberWithDots } from '../util/stringFunctions.js';

const emptyTable= {
    body: {
        articles : []
    },
    totalSize: 0,
    page : 1
}

const ListeArticleCegid = function(props) {

    const {url, handleChangePage,sortHandeler} = useTable(props.query);
    const {data: tableData, loading, error} = useGet(`localhost:4000/articles?${url}`, emptyTable);
    const article = tableData.body.articles
    const {selection, selectionHandeler, deselectionHadeler}=useSelection("");



    const header = [
        { name: "", sort: false},
        { name: "Code Article", sort: false},
        { name: "Libelle", sort: false},
        { name: "Marque", sort: true, trueName : "marque"},
        { name: "Gender", sort: true, trueName : "gender"},
        { name: "Date Ajout", sort: true , trueName : "date_modification"},
        { name: "Prix de vente", sort: true , trueName : "prix_vente"} ,
    ]

    const isSelected = (row) => {if (selection) return row.code_article in selection};
    if (selection) var taille = Object.keys(selection).length
    else var taille = 0
    return (

        <>
        {error ? <aside className={classes.error}>{error}</aside>: "" }
        {taille>0 && props.modification ? 
        <InsertionArticle   taille={taille} deselectionHadeler={deselectionHadeler}  />        
        : ""}
        {article.length===0 && !loading ?<div>Aucun article n'a été trouvé</div> : ""}
        <TableCustom
            tableData={tableData.body.articles}
            totalSize={tableData.totalSize}
            page={tableData.page}
            handleChangePage={handleChangePage}
            loading={loading}
            sx={{
            boxShadow: "#3c40434d 0px 1px 2px 0px,#3c404326 0px 1px 3px 1px"}}
        >
        <TableHeadCustom header={header} sortHandeler={sortHandeler}/>

        <TableBody>
            {article.map((row) => {
                const isItemSelected= isSelected(row)
                return (
                <TableRow
                key={row.code_article}
                aria-checked={isItemSelected}
                selected={isItemSelected}
                >
                {props.modification ? 
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
                : ""}

                <TableCell component="th" scope="row">
                <Link to={`${row.code_article}`}>{row.code_article}</Link>
                </TableCell>
                <TableCell align="left">{row.libelle?.toLowerCase()}</TableCell>
                <TableCell align="left" >{capitalize(row.marque?.toLowerCase())}</TableCell>
                <TableCell align="left" >{row.gender || ""}</TableCell>
                <TableCell align="center" >{moment(Date.parse(row.date_creation)).fromNow()}</TableCell>
                <TableCell align="center" >{numberWithDots(row.GA_PVTTC)}</TableCell>

            </TableRow>)})}
        </TableBody>
        </TableCustom>


        </>
    )
}


  export default ListeArticleCegid