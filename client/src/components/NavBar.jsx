import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton';
import { useSelector } from 'react-redux';
function NavBar() {
 // Obtenez l'état d'authentification à partir de l'atom
  const token = useSelector((state) => state.auth.token);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Nav className="ml-auto">
      {token ? (
        <LogOutButton />
      ) : (
        <>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </>
      )}

      </Nav>
    </Navbar>
  );
}
export default NavBar;
