import { Link } from "react-router-dom";
import { LogoutFetch } from "../services/authService";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux"
import { logout } from "../features/authSlice";
export default function LogOutButton() {
  const dispatch = useDispatch();


  const handleClick = async () => {
    try {
      await LogoutFetch();
      dispatch(logout()); // Dispatch l'action de déconnexion
      console.log("Logged out successfully");
      Cookies.remove("token");
      window.location.href = "/login";

    } catch (error) {
      console.error('Failed to log out:', error.message);
    }
  };
  
    
  
  return (
    <button onClick={handleClick}>
      <Link to="/login">Log Out</Link>
    </button>
  )
}