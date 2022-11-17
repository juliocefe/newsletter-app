import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddNewsLetter from "./AddNewsLetter/NewsLetterAddModal";
import BasicTable from "./newsTable/news";
import { useNewsLetters } from "./useNewsLetters";
import Subscriptions from "../dashboard/Subscriptions";
import NewsLettersByTopicByLast7Days from "../dashboard/newslettersbyday/NewsLettersReport";
import { useDasboardData } from "../dashboard/newslettersbyday/useNewLettersByDay";

function DashBoard() {
  const { nlByTopicByLast7Days, subscriptionsByTopic, isLoading } = useDasboardData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: 400,
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
        {!isLoading && <NewsLettersByTopicByLast7Days data={nlByTopicByLast7Days}/>}
      </Paper>
      <Paper sx={{ p: 1, flex: 1 }}>
        {!isLoading && (<Subscriptions data={subscriptionsByTopic} isLoading={isLoading}/>)}
      </Paper>
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
        background: "#F8F8FF",
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
