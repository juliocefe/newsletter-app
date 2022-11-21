import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useLogin } from "./useLogin";
import Logo from "/src/assets/logo.png";


function Login() {
  const { username, password, authenticate } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault()
    authenticate()
  }

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component={"form"}
        sx={{
          display: "flex",
          width: 400,
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component={"img"} src={Logo} sx={{ width: 80, height: 80 }} />
          <Box component={"h1"} sx={{ fontSize: 30, textAlign: "center" }}>
            Sign in
          </Box>
        </Box>
        <TextField
          {...username}
          name={"username"}
          label={"username"}
          id={"username-id"}
          required={true}
          autoComplete={"username"}
          placeholder={"username"}
          sx={{ mb: 2 }}
        />
        <TextField
          {...password}
          name={"password"}
          label={"password"}
          id={"password-id"}
          type={"password"}
          required={true}
          autoComplete={"current-password"}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type={"submit"}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
