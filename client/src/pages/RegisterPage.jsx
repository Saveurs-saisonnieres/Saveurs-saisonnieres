import Grid from '@mui/material/Grid';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      {/* Colonne de gauche (vide dans cet exemple) */}
      <Grid item xs={6}>
        {/* Contenu de la colonne de gauche */}
      </Grid>

      {/* Colonne de droite (contenant le formulaire de connexion) */}
      <Grid item xs={6}>
        <Grid container justifyContent="center">
          <Grid item>
            <RegisterForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
