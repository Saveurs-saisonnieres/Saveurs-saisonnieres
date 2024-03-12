import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton';
import { useAtom } from 'jotai'; // Assurez-vous d'importer useAtom depuis Jotai
import { authAtom } from '../atoms/authAtom'; // Assurez-vous d'importer votre atom d'authentification

function NavBar() {
  const [authState] = useAtom(authAtom); // Obtenez l'état d'authentification à partir de l'atom

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Nav className="ml-auto">
        {authState.bearerToken !== null ?  (
          <LogOutButton />
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
            <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
