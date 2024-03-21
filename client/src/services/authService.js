import { API_URL } from "../constants";
import axios from "axios";

async function RegisterFetch(email, password, firstName, lastName) {
  try {
    const response = await axios.post(API_URL, {
      user: {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
    });
    
    const data = response.data;
    
    return data
  } catch (error) {
    throw new Error('Failed to register: ' + error.message);
  }
}

async function LoginFetch(email, password) {
  try {
    const response = await axios.post(`${API_URL}/sign_in`, {
      user: {
        email: email,
        password: password
      },
    });
    console.log(response)
    return response;
  } catch (error) {
    throw new Error('Failed to login: ' + error.message);
  }
}

async function LogoutFetch() {
  try {
    const response = await axios.delete(`${API_URL}/sign_out`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log out: ' + error.message);
  }
}

async function EditPasswordFetch(password, confirmPassword, resetPasswordToken) {
  try {
    const response = await axios.patch(`${API_URL}/password`, {
      user: {
        reset_password_token: resetPasswordToken,
        password: password,
        password_confirmation: confirmPassword
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit password: ' + error.message);
  }
}
async function ResetPasswordFetch(email) {
  try {
    const response = await axios.post(`${API_URL}/password`, { 
      user: { 
        email: email 
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to reset password: ' + error.message);
  }
}
export {
  RegisterFetch,
  LoginFetch,
  LogoutFetch,
  EditPasswordFetch,
  ResetPasswordFetch
};
