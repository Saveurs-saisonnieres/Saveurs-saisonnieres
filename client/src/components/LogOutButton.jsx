import { Link } from "react-router-dom";
import { LogoutFetch } from "../services/authService";
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice";
import Button from '@mui/material/Button';
export default function LogOutButton() {
  const dispatch = useDispatch();


  const handleClick = async () => {
    try {
      await LogoutFetch();
      dispatch(logout()); // Dispatch l'action de déconnexion
      console.log("Logged out successfully");
    } catch (error) {
      console.error('Failed to log out:', error.message);
    }
  };
  
    
  
  return (
    <Button variant="outlined" onClick={handleClick}>
      <Link to="/login">Log Out</Link>
    </Button>
  );
}