import { useRef } from "react";
import { useDispatch } from "react-redux";
import { LoginFetch } from "../services/authService";
import { login } from "../features/authSlice";
import Cookies from "js-cookie";
import Logo from "../assets/images/LogoLog.svg";
import Fonregister from "../assets/images/Fonregister.jpg";
import { Grid, Paper, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
      const token = headers.authorization;

      Cookies.set("token", token);
      if (user.admin) {
        Cookies.set("useradmin", user.admin);
        console.log("Successfully logged in as admin: ", data.message);
        window.location.href = "/admin/products";
        dispatch(login({ token: token, isAdmin: true }));
      } else {
        dispatch(login({ token: token, isAdmin: false }));
        console.log("Successfully logged in as non-admin: ", data.message);
        window.location.href = "/products";
      }
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
                Connexion
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
