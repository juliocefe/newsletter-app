import { useState } from "react";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";;
import AddNewsLetter from "./AddNewsLetter/NewsLetterAddModal";
import BasicTable from "./newsTable/news";
import { useNewsLetters } from "./useNewsLetters";

function DashBoard() {
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
  );
}

function NewsScreen() {
  const [open, setOpen] = useState(false);

  const { newsLetters, isLoading, fetchNewsLetters } = useNewsLetters();

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
        }}
      >
        <BasicTable data={newsLetters} />
      </Box>
      {open && (
        <AddNewsLetter
          open={open}
          handleClose={() => setOpen(false)}
          onSuccess={() => fetchNewsLetters(new AbortController())}
        />
      )}
    </Box>
  );
}

export default NewsScreen;
