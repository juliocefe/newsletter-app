import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import {Context} from "./Context";
import Login from "./components/login/login";
import NewsScreen from "./components/news/NewsScreen";

function App() {
  const { isLoading, user, isAuth, activateAuth, handleAuth } =
    useContext(Context);

  useEffect(() => {
    handleAuth();
  }, []);

  if (isLoading) {
    return <Box>loading</Box>
  }
  if (!isAuth) {
    return <Login activateAuth={activateAuth}/>;
  }
  return <NewsScreen />;
}

export default App;
