import { useState } from 'react';
import { RegisterFetch } from '../services/authService';



import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function RegisterForm() {
  const [formData, setFormData] = useState({
    user: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.user.password !== formData.user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const data = await RegisterFetch(formData.user.email, formData.user.password);
      console.log(data)
      window.location.href = '/';
    } catch (error) {
      alert('Failed to register: ' + error.message);
    }
  };


  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            Inscription
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <TextField id="outlined-basic" label="email" value={formData.email} variant="outlined" onChange={handleChange} name="email" />
              <TextField id="outlined-basic" label="password" value={formData.password} variant="outlined" onChange={handleChange} name="password" />
              <TextField id="outlined-basic" label="password" value={formData.confirmPassword} variant="outlined" onChange={handleChange} name="password" />
              <Button variant="contained"type="submit">Login</Button>
              <Box>
                <Box>
                  <Link href="/login">Already registered ?</Link>
                </Box>
                <Box>
                  <Link href="/">Back to home</Link>
                </Box>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default RegisterForm;
