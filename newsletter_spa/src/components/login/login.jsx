import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useLogin } from "./useLogin";
import Logo from '/src/assets/logo.png';

function Input({ state, name, extraAtrs }) {
  return (
    <TextField
      {...state}
      id={name}
      label={name}
      variant="outlined"
      sx={{ mb: 2 }}
      {...extraAtrs}
    />
  );
}

function Login() {
  const { username, password, authenticate } = useLogin();

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: 400,
          flexDirection: "column",
        }}
      >
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Box component={"img"} src={Logo} sx={{width: 80, height: 80}}/>
          <Box component={"h1"} sx={{ fontSize: 30, textAlign: "center" }}>
            Sign in
          </Box>
        </Box>
        <Input state={username} name="username" />
        <Input
          state={password}
          name="password"
          extraAtrs={{ type: "password" }}
        />
        <Button variant="contained" onClick={authenticate}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
