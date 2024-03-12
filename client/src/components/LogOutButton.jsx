import { Link } from "react-router-dom";
import { LogoutFetch } from "../services/authService";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
export default function LogOutButton() {

  const [, setAuth] = useAtom(authAtom);

  const handleClick = async () => {
    try {
      const response = await LogoutFetch();
      setAuth({ bearerToken: null });
      console.log(response)
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