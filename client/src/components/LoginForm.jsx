// import * as React from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useRef } from "react";
import { LoginFetch } from "../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

import Logo from "../assets/images/LogoLog.svg";
import Fonregister from "../assets/images/Fonregister.jpg";

export default function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { data, headers } = await LoginFetch(email, password);
      const user = data.user;
      Cookies.set("useradmin", user.admin);
      const token = headers.authorization;
      Cookies.set("token", token);
      dispatch(login({ token: token, isAdmin: user.admin }));
      console.log("Successfully logged in : ", data.message);
      window.location.href = "/products";
    } catch (error) {
      console.error("Failed to login:", error.message);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Fonregister})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "200px", height: "auto", marginBottom: 20 }}
            />
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#afb42b",
                  "&:hover": { bgcolor: "#828A0E" },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"Pas de compte ? S'enregistrer"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
