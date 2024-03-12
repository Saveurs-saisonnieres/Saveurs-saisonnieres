import { API_URL } from "../constants";
import axios from "axios";

async function RegisterFetch(email, password) {
  try {
    const response = await axios.post(API_URL, {
      user: {
        email: email,
        password: password
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

export {
  RegisterFetch,
  LoginFetch,
  LogoutFetch
};
