import Cookies from "js-cookie";
import { useRef } from 'react';
import { LoginFetch } from '../services/authService';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function LoginForm() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { data, headers } = await LoginFetch(email, password);
      const token = headers.authorization; 
      Cookies.set('token', token);
      dispatch(loginSuccess(token));
      console.log('Successfully logged in : ', data.message);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to login:', error.message);
    }
  };

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <TextField id="email-login" label="email" inputRef={emailRef} variant="outlined" name="email" />
              <TextField id="password-login" type="password" label="password" inputRef={passwordRef} variant="outlined" name="password" />
              <Button variant="contained" type="submit">Login</Button>
              <Box>
                <Box>
                  <Link href="/register">Not registered yet ?</Link>
                </Box>
                <Box>
                  <Link href="/password/reset">Forgot password ?</Link>
                </Box>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}
