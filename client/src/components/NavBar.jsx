import { AppBar, Toolbar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoHome from './LogoHome';
import { Link } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogOutButton from './LogOutButton';

function NavBar() {
  const { token, isAdmin } = useSelector((state) => state.auth);

  return (
    <div style={{ marginTop: 50 }}>
      <AppBar position="static">
        <Toolbar sx={{ alignItems: 'center', mt: 5 }}>
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
            <LogoHome />
            <div style={{ marginLeft: 230 }}>
              <Button component={Link} to="/legumes" color="inherit" sx={{ marginRight: 2, paddingBottom: 4, color: 'white' }}>Légumes</Button>
              <Button component={Link} to="/fruits" color="inherit" sx={{ paddingBottom: 4, color: 'white'}}>Fruits</Button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {token && (
              <>
                <Link to="/cart"><ShoppingCartIcon sx={{ color: 'white', marginRight: 5, width: 40, height: 40, marginTop: -5 }} /></Link>
                {isAdmin ? (
                  <Link to="/admin/page">
                    <AccountCircleIcon sx={{ color: 'white', marginRight: 5, width: 50, height: 50, marginTop: -5 }} />
                  </Link>
                ) : (
                  <Link to="/profil">
                    <AccountCircleIcon sx={{ color: 'white', marginRight: 5, width: 50, height: 50, marginTop: -5 }} />
                  </Link>
                )}
                <LogOutButton /> 
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
