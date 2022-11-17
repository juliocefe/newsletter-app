import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import {Context} from "/src/Context";
import AddNewsLetter from "./AddNewsLetter/NewsLetterAddModal";
import BasicTable from "./newstable/news";
import { useNewsLetters } from "./useNewsLetters";
import Subscriptions from "../dashboard/Subscriptions";
import NewsLettersByTopicByLast7Days from "../dashboard/newslettersbyday/NewsLettersReport";
import { useDasboardData } from "../dashboard/newslettersbyday/useNewLettersByDay";

function DashBoard() {
  const { nlByTopicByLast7Days, subscriptionsByTopic, isLoading } =
    useDasboardData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: 400,
        marginTop: 3
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 3,
          height: 400,
          mr: 2,
        }}
      >
        {!isLoading && (
          <NewsLettersByTopicByLast7Days data={nlByTopicByLast7Days} />
        )}
      </Paper>
      <Paper sx={{ p: 1, flex: 1 }}>
        {!isLoading && (
          <Subscriptions data={subscriptionsByTopic} isLoading={isLoading} />
        )}
      </Paper>
    </Box>
  );
}

function LogOutButton({ logout }) {
  return (
    <Button variant="outlined" onClick={logout} sx={{position: "absolute", right: 1, top: 1 }}>
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
        position: "relative"
      }}
    >
      <Box>
        <LogOutButton logout={logout}/>
      </Box>
      <DashBoard />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
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
