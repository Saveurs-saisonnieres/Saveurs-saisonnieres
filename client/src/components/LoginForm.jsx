import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LoginFetch } from '../services/authService';
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
export default function LoginFrom() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [, setAuth] = useAtom(authAtom);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, authorizationHeader } = await LoginFetch(formData.email, formData.password);
      const token = authorizationHeader; 
      setAuth({ bearerToken: token });
      Cookies.set('token', token);
      console.log(data)
    } catch (error) {
      console.error('Failed to login:', error.message);
    }
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} autoComplete='email' />
        <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} autoComplete='current-password' />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}