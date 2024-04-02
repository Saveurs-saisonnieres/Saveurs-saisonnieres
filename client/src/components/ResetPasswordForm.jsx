import { useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ResetPasswordFetch } from '../services/authService';

export default function ResetPasswordForm() {
  const emailRef = useRef(null); // Référence correctement initialisée
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      const response = await ResetPasswordFetch(email);
      console.log(response.data);
      setMessage('Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.');
    } catch (error) {
      console.error('Failed to reset password:', error.message);
      setMessage('Une erreur est survenue lors de la réinitialisation du mot de passe.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '70vh', 
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 400,
          padding: 3,
          borderRadius: 8,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Réinitialiser le mot de passe
        </Typography>
        <FormControl sx={{ width: '100%', mb: 2 }}>
          <TextField
            type="email"
            label="Adresse email"
            variant="outlined"
            inputRef={emailRef}
            required
          />
        </FormControl>

        <Button variant="contained" type="submit" sx={{ width: '100%', mt: 2 }}>
          Réinitialiser le mot de passe
        </Button>
        {message && <Typography variant="body1" sx={{ mt: 2 }}>{message}</Typography>}
      </form>
    </div>
  );
}
