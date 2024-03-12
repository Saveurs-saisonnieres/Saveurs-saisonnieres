import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { EditPasswordFetch } from '../services/authService';
import { useState } from 'react';
function EditPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get('reset_password_token');

  
  const [formData, setFormData] = useState({
    user: {
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
      const data = await EditPasswordFetch(formData.user.password, formData.user.confirmPassword, resetPasswordToken);
      console.log(data)
      window.location.href = '/login';
    } catch (error) {
      alert('Failed to edit password: ' + error.message);
    }
  };
  

  return (
    <div>
      <h2>Edit Password</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          name="password" 
          value={formData.user.password} 
          onChange={handleChange} 
          placeholder="Password" 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
          type="password" 
          name="confirmPassword" 
          value={formData.user.confirmPassword} 
          onChange={handleChange} 
          placeholder="Confirm Password" 
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default EditPassword;