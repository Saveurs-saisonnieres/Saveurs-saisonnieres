import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetProducts, DeleteProductfetch } from "../services/productService";
// import { GetOrders } from "../services/orderService";
import Cookie from "js-cookie";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper 
} from "@mui/material";


function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // fetchOrders();
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

  // const fetchOrders = async () => {
  //   try {

  //     const response = await GetOrders();
  //     setOrders(response.data);
  //   } catch (error) {
  //     console.error(
  //       "Une erreur s'est produite lors de la récupération des commandes des clients:",
  //       error
  //     );
  //   }
  // };

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

  const navigateToAddProduct = () => {
    navigate("/admin/products/add");
  };

  const navigateToEditProduct = (Id) => {
    console.log("ID du produit:", Id);
    navigate(`/admin/products/edit/${Id}`);
  };

  return (
    <>
      <Box sx={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Liste des produits :
        </Typography>
        <Button variant="contained" onClick={fetchProducts} sx={{ marginRight: 1, marginBottom: 2, backgroundColor: '#', '&:hover': { backgroundColor: '#E5E5E5' }}}>
          Rafraîchir
        </Button>
        <Button variant="contained" onClick={navigateToAddProduct} sx={{ marginRight: 1, marginBottom: 2 }}>
          Ajouter un produit
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Prix</TableCell>
                <TableCell align="right">Variété</TableCell>
                <TableCell align="right">Origine</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.variety}</TableCell>
                  <TableCell align="right">{product.origin}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => handleClick(product.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Supprimer
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigateToEditProduct(product.id)}
                    >
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Box>

      <Box sx={{ paddingBottom: 10, paddingLeft: 20, paddingRight: 120, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Commandes :
        </Typography>
        <Button variant="contained"  sx={{ marginRight: 1, marginBottom: 2 }}>
          Rafraîchir
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom client</TableCell>
                <TableCell align="right">Numéro de commande</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Heure</TableCell>
                <TableCell align="right">Coût</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">{order.customerName}</TableCell>
                  <TableCell align="right">{order.id}</TableCell>
                  <TableCell align="right">{order.date}</TableCell>
                  <TableCell align="right">{order.time}</TableCell>
                  <TableCell align="right">{order.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
        <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer cette commande ?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Annuler</Button>
            <Button onClick={handleDeleteConfirmed}>Supprimer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default AdminProduct;