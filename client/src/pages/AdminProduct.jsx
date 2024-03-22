import { useState, useEffect } from "react";
import { GetProducts, DeleteProductfetch } from "../services/productService";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

function IndexProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Appeler la fonction GetProducts lorsque le composant est monté
    fetchProducts();
  }, []); // Utiliser une dépendance vide pour s'assurer que useEffect ne s'exécute qu'une seule fois

  const fetchProducts = async () => {
    try {
      const response = await GetProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des produits:",
        error
      );
    }
  };

  const isAdmin = localStorage.getItem("useradmin") === "true";

  const handleClick = async (productId) => {
    try {
      await DeleteProductfetch(productId, isAdmin);
      const updatedProducts = await GetProducts();
      setProducts(updatedProducts.data);
      console.log("Produit supprimé avec succès");
    } catch (error) {
      console.error("Échec de la suppression du produit :", error.message);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Liste des produits :
      </Typography>
      <List>
        {/* Utiliser map pour afficher chaque produit */}
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Description : ${product.description}, Prix : ${product.price}`}
            />
            <Button variant="outlined" onClick={() => handleClick(product.id)}>
              Supprimer
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default IndexProduct;
