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


export default function BasicTable({data}) {
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
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.topic}</TableCell>
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
