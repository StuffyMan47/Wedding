import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GuestModel } from '../entities/guest/model/guest-model';
import { useEffect, useState } from 'react';
import '../app/styles/App.css'
//import { List } from '@mui/material';

interface Props {
    data: Array<GuestModel>;
}

const MaterialTable: React.FC<Props> = ({ data }) => {
    const [rows, setRows] = useState<Array<GuestModel>>([]);

    useEffect(() => {
        setRows(data);
    }, [data]);
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Is Come</TableCell>
                        <TableCell align="right">Couple Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.isCome ? "Придут" : "Не придут"}</TableCell>
                        <TableCell align="right">{row.coupleName}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
            </TableContainer >
  );
};

export default MaterialTable;