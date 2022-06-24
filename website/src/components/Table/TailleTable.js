import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DepotTable } from '../Articles/DepotTable';


const TailleTable = function({tailles, stock}) {
    //Tableau utilisé dans la fiche Article
    return ( <div style={{gridRow: "span 2"}}>

        <h1>Taille et Dépot</h1>
        <TableContainer component={Paper} sx={{width: "100%",marginTop: "30px", fontSize: "2em"}}>
        <Table>
        <TableHead>
            <TableRow>
                <TableCell>Code Barre</TableCell>
                <TableCell align="right">Dimension</TableCell>
                <TableCell align="right">Stock</TableCell>
            <TableCell />
            </TableRow>
        </TableHead>
        <TableBody>
            {tailles.map((taille) => (
            <DepotTable key={taille.GA_CODEBARRE} taille={taille} stock={stock} />
            ))}
        </TableBody>
        </Table>
        </TableContainer>
        </div>
    )
}

export default TailleTable;

