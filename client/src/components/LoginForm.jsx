
// import de logique pour les composants
import Cookies from "js-cookie";
import { useState } from 'react';
import { LoginFetch } from '../services/authService';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/authSlice";

// composent M Ui
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
export default function LoginFrom() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const dispatch = useDispatch();
  const tokenState = useSelector((state) => state.auth);
  console.log(tokenState.token);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, headers } = await LoginFetch(formData.email, formData.password);
      const token = headers.authorization; 
      Cookies.set('token', token);
      dispatch(loginSuccess(token));
      console.log('Successfully logged in : ', data.message);
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
              <TextField id="outlined-basic" label="email" value={formData.email} variant="outlined" onChange={handleChange} name="email" />
              <TextField id="outlined-basic" label="password" value={formData.password} variant="outlined" onChange={handleChange} name="password" />
              <Button variant="contained"type="submit">Login</Button>
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
  )
}