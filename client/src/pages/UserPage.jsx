import { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import { ShowUser } from "../services/userService";
import { format } from 'date-fns';

function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ShowUser();
        setUser(response);
        console.log("User:", response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "100px 600px 100px 100px" }}>
      <Typography variant="h3" component="h3" gutterBottom>
        Votre profil utilisateur
      </Typography>
      {user && (
        <div style={{ paddingRight: "900px" }}>
          <TextField
            label="Prénom"
            value={user.first_name}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Nom"
            value={user.last_name}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            value={user.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="outlined" color="primary" sx={{ mt: 1 }}>Modifier</Button>
        </div>
      )}
      <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 3 }}>
        Commandes
      </Typography>
      {user && user.orders.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 0 }}>
          <Table sx={{ minWidth: 450 }}>
            <TableHead>
              <TableRow>
                <TableCell>Numéro de commande</TableCell>
                <TableCell>Date</TableCell>
                {/* <TableCell>Heure</TableCell> */}
                <TableCell>Coût</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{format(new Date(order.created_at), 'dd/MM/yyyy')}</TableCell>
                  {/* <TableCell>{format(new Date(order.time), 'HH:mm')}</TableCell> */}
                  <TableCell>{order.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" gutterBottom>
          Aucune commande trouvée.
        </Typography>
      )}
    </div>
  );
}

export default UserPage;

