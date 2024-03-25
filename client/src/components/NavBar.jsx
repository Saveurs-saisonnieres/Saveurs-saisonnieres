import { AppBar, Toolbar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import LogoHome from './LogoHome';
import { Link } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavBar() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div style={{ marginTop: 50 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
          <LogoHome />
          
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <div style ={{ marginRight: 800,paddingBottom: 30  }}>
            <Button component={Link} to="/legumes" color="inherit" sx={{ marginRight: 2, color: 'white'}}>Légumes</Button>
            <Button component={Link} to="/fruits" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Fruits</Button>
            <Button component={Link} to="/panier" color="inherit" sx={{ marginRight: 2, color: 'white' }}>Panier</Button>
            </div>
            <ShoppingCartIcon sx={{ color: 'white', marginRight: 5, width: 40, height: 40, marginTop: -5 }} />
            <AccountCircleIcon sx={{ color: 'white', marginRight: 5, width: 50, height: 50, marginTop: -5 }} />
            <Button 
              component={Link}
              to=""
              variant="text"
              color="inherit"
              sx={{
                marginTop: -5,
                marginRight: 20,
                bgcolor: '#FFFFFF',
                color: '#000000',
                '&:hover': {
                  bgcolor: '#E5E5E5', 
                },
              }}
            >
              Se déconnecter
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
