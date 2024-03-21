import React from 'react';
import { Link } from 'react-router-dom'; // Import du composant Link
import Button from '@mui/material/Button';
import welcomeImage from '../assets/images/welcomeF.svg';
import Abbio from '../assets/images/Abbio.svg'; 
import Blanc from '../assets/images/LogoBlanc.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RondLoc from '../assets/images/RondLoc.svg';
import RondThunder from '../assets/images/RondThunder.svg';
import RondVelo from '../assets/images/RondVelo.svg';

function HomePage() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh', 
    backgroundImage: `url(${welcomeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    padding: '50px 200px 100px 200px',

  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center', 
    color: 'black', 
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const homeStyle = {
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    color: 'white',
  };

  const homeStyleParapgraph = {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: '25px',
  };

  const centeredContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const h1Style = {
    color: '#8B1D1D',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
  };

  const h2Style = {
    color: '#8B1D1D',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 100,
  };
  
  const pStyle = {
    color: '#C0CA33', 
    fontSize: '25px',
  };

  const imgStyle = {
    zIndex: '999', 
    width: '150px',
  };

  const buttonTextStyle = {
    color: 'black',
    fontWeight: 'bold', 
  };

  const containerStyleInline = {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#8B1D1D', 
  };
  
  const iconStyle = {
    fontSize: 100,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: -5,
  };

  const iconStyleLine = {
    fontSize: 100,
    marginRight: 2,
    height: 100,
    marginBottom: -4,
  };

  const paragraphContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const pStyle123 = {
    color: '#C0CA33', 
    fontSize: '25px',
    marginLeft: '100px',
    marginRight: '100px',
    marginBottom: '100px',
  };

  const rond = {
    zIndex: '999',
    width: '150px',
    marginLeft: '150px',
    marginRight: '150px',
    marginBottom: '100px',

  };

  const pRond = {
    color: '#C0CA33', 
    marginLeft: '-100px',
    fontSize: '20px',
    marginBottom: '100px',
  };

  const footerBot = {
    marginBottom: '100px',
    color: '#8B1D1D',
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={rowStyle}>
          <div style={textContainerStyle}>
            <img src={Blanc} alt="Logo" style={imgStyle} />
          </div>
          <div style={textContainerStyle}>
            <Link to="/login">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  bgcolor: '#FFFFFF', 
                  '&:hover': { bgcolor: '#E5E5E5' },
                  ...buttonTextStyle, 
                }}
              >
                Se connecter
              </Button>
            </Link>
            <Link to="/Register">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  bgcolor: '#FFFFFF', 
                  '&:hover': { bgcolor: '#E5E5E5' },
                  ...buttonTextStyle, 
                }}
              >
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
        <div style={homeStyle}>
          <h1>Commander des légumes et fruits frais de producteurs locaux</h1>
            <div style={homeStyleParapgraph}>
              <p>Où nous trouver : </p>
              <p><LocationOnIcon sx={{ fontSize: 40, marginRight: 2 }} />14 rue des étoiles 34000 Montpellier</p>
            </div>
        </div>
        <div style={rowStyle}>
          <div style={textContainerStyle}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#FFFFFF', 
                '&:hover': { bgcolor: '#E5E5E5' },
                ...buttonTextStyle, 
              }}
            >
              Commande prête<br />1h après votre commande
            </Button>
          </div>
          <div style={{ ...textContainerStyle, flex: '1', textAlign: 'center' }}>
            <img src={Abbio} alt="Abbio" style={imgStyle} />
          </div>
          <div style={textContainerStyle}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#FFFFFF', 
                '&:hover': { bgcolor: '#E5E5E5' },
                ...buttonTextStyle, 
              }}
            >
              Récupérer directement <br />chez votre producteur
            </Button>
          </div>
        </div> 
      </div>
      <div style={centeredContentStyle}>
        <h1 style={h1Style}>Commandez vos fruits et légumes simplement </h1>
        <p style={pStyle}>En savoir plus sur les courses en ligne</p>
      </div>
      <div style={containerStyleInline}>
        <p style={{ display: 'inline-block' }}>
          <LocationOnIcon sx={iconStyle} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <HorizontalRuleIcon sx={iconStyleLine} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <PaymentIcon sx={iconStyle} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <HorizontalRuleIcon sx={iconStyleLine} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <ShoppingCartIcon sx={iconStyle} />
        </p>
      </div>
      <div style={paragraphContainerStyle}>
        <p style={pStyle123}> 1. Je repère mon primeur</p>
        <p style={pStyle123}> 2. Je commande et paye en ligne</p>
        <p style={pStyle123}> 3. Ma commande prêt en 1h</p>
      </div>
      <div>
        <h1 style={h2Style}>Les avantages d’une commande chez Saveurs Saisonnières</h1>
      </div>
      <div style={containerStyleInline}>
        <img src={RondVelo} alt="Logo" style={rond} />
        <p style ={pRond}>Produit frais<br />et locale</p>
        <img src={RondLoc} alt="Logo" style={rond} />
        <p style ={pRond}>Relation de proximité,<br />moins de pollution</p>
        <img src={RondThunder} alt="Logo" style={rond} />
        <p style ={pRond}>Rapidité de<br />préparation</p>
      </div>
      <div>
        <h2 style={footerBot}>Venez découvrir Saveurs Saisonnières en magasin, pour plus de proximité</h2>
      </div>
    </div>
  );
}

export default HomePage;
