import { useState, useEffect } from "react";
import GetProducts from "../services/productService";
import { Typography, List, ListItem, ListItemText } from '@mui/material';

export default function IndexProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Appeler la fonction GetProducts lorsque le composant est monté
    GetProducts()
      .then(response => {
        // Mettre à jour l'état avec les produits récupérés de l'API
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des produits:', error);
      });
  }, []); // Utiliser une dépendance vide pour s'assurer que useEffect ne s'exécute qu'une seule fois

  return (
    <>
      <Typography variant="h4" gutterBottom>Liste des produits :</Typography>
      <List>
        {/* Utiliser map pour afficher chaque produit */}
        {products.map(product => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Description : ${product.description}, Prix : ${product.price}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
