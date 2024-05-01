import  { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Stack,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import logo from "../assets/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login } = useLogin();
  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username: email,
      password,
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh",
        }}
      >
        <Container
        maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper sx={{p:3}}>

          <Stack gap={4} sx={{
            width:"100%"
          }}>
            <Typography variant="h3" sx={{ textAlign: "center", fontWeight:"bold" }}>
            <img src={logo} width="60%" />
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Login
            </Typography>
            <TextField
              label="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error !== null && <Alert severity="error">{error}</Alert>}

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              endIcon={loading ? <CircularProgress /> : <PersonIcon />}
            >
              Login
            </Button>
          </Stack>
          </Paper>

        </Container>
      </Box>
    </Container>
  );
};

export default LoginPage;
