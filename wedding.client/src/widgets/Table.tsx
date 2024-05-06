import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GuestListModel } from '../entities/guest/model/guest-model';
import { useEffect, useState } from 'react';
import { useGuestList } from '../entities/guest/api/guest-list-api';

export default function GuestTable() {

    const [guests, setGuests] = useState<GuestListModel[]>();

    const { data: guestList } = useGuestList();
    //getGuestsList()
    setGuests(guestList)
    useEffect(() => {
        setGuests(guestList);
    }, []);

    //async function getGuestsList() {
    //    const response = await fetch('/api/Guests/get-guest-list');
    //    const data = await response.json();
    //    setGuests(data);
    //}
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label=" то придЄт">
                <TableHead>
                    {/*<TableRow>*/}
                    {/*    <TableCell>Dessert (100g serving)</TableCell>*/}
                    {/*    <TableCell align="left" >Calories</TableCell>*/}
                    {/*    <TableCell align="left">Fat&nbsp;(g)</TableCell>*/}
                    {/*    <TableCell align="left">Carbs&nbsp;(g)</TableCell>*/}
                    {/*    <TableCell align="left">Protein&nbsp;(g)</TableCell>*/}
                    {/*</TableRow>*/}
                </TableHead>
                <TableBody>
                    {guests!.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.coupleName}</TableCell>
                            <TableCell align="right">{row.isCome}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}