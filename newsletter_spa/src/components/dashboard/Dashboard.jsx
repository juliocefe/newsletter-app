import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Subscriptions from "../dashboard/Subscriptions";
import NewsLettersByTopicByLast7Days from "./newslettersbyday/NewsLettersReport";
import { useDasboardData } from "./newslettersbyday/useNewLettersByDay";

export default function DashBoard() {
  const { nlByTopicByLast7Days, subscriptionsByTopic, isLoading } =
    useDasboardData();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 400,
        marginTop: 3,
      }}
    >
      {isLoading ? (
        <Box sx={{fontSize: 20}}>We need loader indicators...</Box>
      ) : (
        <>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 3,
              height: 405,
              mr: 2,
            }}
          >
            <NewsLettersByTopicByLast7Days data={nlByTopicByLast7Days} />
          </Paper>
          <Paper sx={{ p: 1, flex: 1 }}>
            <Subscriptions data={subscriptionsByTopic} isLoading={isLoading} />
          </Paper>
        </>
      )}
    </Box>
  );
}
