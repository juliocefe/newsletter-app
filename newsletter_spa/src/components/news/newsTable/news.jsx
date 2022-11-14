import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// me
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';

function createData(name, calories, status) {
  return { name, calories, status };
}

const rows = [
  createData('Check Peres something', "Cars", "pending"),
  createData('Ice cream sandwich', "Cooking", "success"),
  createData('Messi something', "Sports", "success"),
  createData('Cupcake', "Cooking", "pending"),
  createData('Gingerbread', "Cooking", "pending"),
];

export default function BasicTable() {
  const status = {
    "pending": "info",
    "success": "success"
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Topic</TableCell>
            {/* <TableCell align="right">Date</TableCell> */}
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">
                <Chip label={row.status} color={status[row.status]} variant="outlined" />
              </TableCell>
              <TableCell align="right">
              <Button variant="outlined" size={"small"} color="primary" onClick={() => setOpen(true)}>
                Edit
               </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
