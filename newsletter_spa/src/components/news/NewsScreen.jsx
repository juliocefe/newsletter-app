import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddNewsLetter from "./AddNewsLetter/NewsLetterAddModal";
import BasicTable from "./newsTable/news";


function DashBoard(){
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      mt: 2,
      height: 100,
      border: "1px solid lightgray",
    }}
  >
    Dashboard here
  </Box>
  )
}

function NewsScreen() {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <DashBoard />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          // border: "1px solid green",
          mt: 2,
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add News Letter
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          mt: 1,
          // border: "1px solid red",
        }}
      >
        <BasicTable />
      </Box>
      <AddNewsLetter open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
}

export default NewsScreen;
