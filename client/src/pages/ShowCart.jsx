import { useState, useEffect } from 'react';
import { GetCart, RemoveFromCart } from '../services/cartServices';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowCart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log("Appel du fetch");
        const response = await GetCart();  
        if (response) {
          setCart(response);
          calculateTotalPrice(response); // Calculer le prix total lors du chargement du panier
        } else {
          console.error('Invalid cart data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  // Fonction pour ajuster la quantité d'un produit dans le panier localement
  const adjustQuantity = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 }; // La quantité ne peut pas être inférieure à 1
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotalPrice(updatedCart); // Recalculer le prix total après chaque ajustement de quantité
  };

  // Fonction pour calculer le prix total du panier
  const calculateTotalPrice = (cart) => {
    let total = 0;
    cart.forEach(item => {
      const itemPrice = isNaN(item.price) ? 0 : item.price;
      const itemQuantity = isNaN(item.quantity) ? 1 : item.quantity;
      total += itemPrice * itemQuantity;
    });
    setTotalPrice(total);
  };

  // Fonction pour supprimer un produit du panier
  const handleRemoveFromCart = async (productId) => {
    try {
      await RemoveFromCart(productId);
      // Après la suppression réussie, recharger le panier
      const updatedCart = await GetCart();
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div>
      <Typography variant="h1">Cart</Typography>
      {cart && cart.length > 0 ? (
        <div>
          <Typography variant="h2">Cart Products:</Typography>
          <List>
            {cart.map((product) => (
              <ListItem key={product.id}>
                <ListItemText 
                  primary={`Name: ${product.name}`} 
                  secondary={`Price: ${isNaN(product.price) ? 'N/A' : product.price * (product.quantity || 1)}`} 
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => adjustQuantity(product.id, -1)} aria-label="remove">
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1">{typeof product.quantity === 'number' ? product.quantity : 1}</Typography>
                  <IconButton onClick={() => adjustQuantity(product.id, 1)} aria-label="add">
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveFromCart(product.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant="h3">Total Price: {totalPrice}</Typography>
        </div>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </div>
  );
};

export default ShowCart;
