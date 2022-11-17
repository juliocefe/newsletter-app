import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Context } from "/src/Context";
import AddNewsLetter from "./AddNewsLetter/NewsLetterAddModal";
import BasicTable from "./newstable/news";
import { useNewsLetters } from "./useNewsLetters";
import DashBoard from "../dashboard/Dashboard";


function LogOutButton({ logout }) {
  return (
    <Button
      variant="outlined"
      onClick={logout}
      sx={{ position: "absolute", right: 1, top: 1 }}
    >
      Log out
    </Button>
  );
}

function NewsScreen() {
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useContext(Context);
  const { newsLetters, isLoading, fetchNewsLetters } = useNewsLetters();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        position: "relative",
      }}
    >
      <Box>
        <LogOutButton logout={logout} />
      </Box>
      <DashBoard />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
          mt: 3,
        }}
      >
        <Button variant="contained" onClick={() => setOpenModal(true)}>
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
      {openModal && (
        <AddNewsLetter
          open={openModal}
          handleClose={() => setOpenModal(false)}
          onSuccess={() => fetchNewsLetters(new AbortController())}
        />
      )}
    </Box>
  );
}

export default NewsScreen;
