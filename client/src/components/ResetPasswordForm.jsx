import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useRef } from 'react';
import { ResetPasswordFetch } from '../services/authService';

export default function ResetPasswordForm() {
  const emailRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      const response = await ResetPasswordFetch(email);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to reset password:', error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl>
        <Typography>Votre adresse e-mail :</Typography>
        <TextField
          type="email"
          placeholder="Email"
          inputRef={emailRef}
        />
      </FormControl>

      <Button variant="contained" type="submit">
        Envoyez-moi les instructions
      </Button>
    </Box>
  )
}
