import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutButton from './LogOutButton';

function NavBar() {
  // Obtenez l'état d'authentification à partir de l'atom
  const token = useSelector((state) => state.auth.token);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Home
        </Typography>
        <div>
          {token ? (
            <LogOutButton />
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/register" color="inherit">Register</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
