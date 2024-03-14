import { useRef } from 'react';
import { RegisterFetch } from '../services/authService';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function RegisterForm() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const data = await RegisterFetch(email, password);
      console.log(data);
      window.location.href = '/';
    } catch (error) {
      alert('Failed to register: ' + error.message);
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h3" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="email-register"
              label="Email"
              variant="outlined"
              inputRef={emailRef}
              autoComplete="email"
            />
            <TextField
              id="password-register"
              label="Password"
              type="password"
              variant="outlined"
              inputRef={passwordRef}
              autoComplete="new-password"
            />
            <TextField
              id="confirmPassword-register"
              label="Confirm Password"
              type="password"
              variant="outlined"
              inputRef={confirmPasswordRef}
              autoComplete="new-password"
            />
            <Button variant="contained" type="submit">
              Register
            </Button>
            <Box>
              <Box>
                <Link href="/login">Already registered?</Link>
              </Box>
              <Box>
                <Link href="/">Back to home</Link>
              </Box>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default RegisterForm;
