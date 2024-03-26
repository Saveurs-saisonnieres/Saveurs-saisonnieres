import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetProducts, DeleteProductfetch } from "../services/productService";
import Cookie from "js-cookie";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const isAdmin = Cookie.get("useradmin") === "true";

  const handleClick = (productId) => {
    setSelectedProductId(productId);
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await DeleteProductfetch(selectedProductId, isAdmin);
      const updatedProducts = await GetProducts();
      setProducts(updatedProducts.data);
      console.log("Produit supprimé avec succès");
    } catch (error) {
      console.error("Échec de la suppression du produit :", error.message);
    } finally {
      setSelectedProductId(null);
      setIsConfirmationOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedProductId(null);
    setIsConfirmationOpen(false);
  };

  // Fonction pour rediriger vers la page d'ajout de produit
  const navigateToAddProduct = () => {
    navigate("/admin/products/add");
  };

  // Fonction pour rediriger vers la page de modification de produit
  const navigateToEditProduct = (Id) => {
    console.log("ID du produit:", Id);
    navigate(`/admin/products/edit/${Id}`);
  };
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Liste des produits :
      </Typography>
      <Button variant="contained" onClick={fetchProducts}>
        Rafraîchir
      </Button>
      <Button variant="contained" onClick={navigateToAddProduct}>
        Ajouter un produit
      </Button>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Description : ${product.description}, Prix : ${product.price}, Variety : ${product.variety}, Origin : ${product.origin}, ImageId : ${product.image_id}`}
            />
            <Button variant="outlined" onClick={() => handleClick(product.id)}>
              Supprimer
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigateToEditProduct(product.id)}
            >
              Modifier
            </Button>
            {console.log(product.id)}
          </ListItem>
        ))}
      </List>
      <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce produit ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Annuler</Button>
          <Button onClick={handleDeleteConfirmed}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminProduct;
