import { useState, useEffect } from 'react';
import { GetCart, RemoveFromCart } from '../services/cartServices';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookie from 'js-cookie';
import axios from 'axios';
const ShowCart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await GetCart();  
        if (response && response.data) {
          setCart(response.data);
          calculateTotalPrice(response.data.products); // Calculer le prix total lors du chargement du panier
          console.log('Cart:', response.data);
        } else {
          console.error('Invalid cart data:', response);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  // Fonction pour ajuster la quantité d'un produit dans le panier localement
  const adjustQuantity = async (productId, cartProductId, change) => {
    const updatedCartProducts = cart.products.map(item => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 };
      }
      return item;
    });
  
    setCart({ ...cart, products: updatedCartProducts });
    calculateTotalPrice(updatedCartProducts);
  
    try {
      const response = await axios.patch(
        `http://localhost:3000/cart_products/${cartProductId}`, // Ajoutez cartProductId à l'URL
        { quantity: updatedCartProducts.find(item => item.product.id === productId).quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookie.get("token")
          },
        }
      );
      console.log('Cart updated:', response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  
  
  // Fonction pour calculer le prix total du panier
  const calculateTotalPrice = (cartProducts) => {
    let total = 0;
    cartProducts.forEach(item => {
      const itemPrice = isNaN(item.product.price) ? 0 : parseFloat(item.product.price);
      const itemQuantity = item.quantity || 1;
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
      setCart(updatedCart.data);
      calculateTotalPrice(updatedCart.data.products);
      console.log(updatedCart)
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };
  // Fonction pour créer le checkout et rediriger vers la page de paiement
  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:3000/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookie.get('token'), // Assurez-vous que le token d'authentification est inclus si nécessaire
        },
        body: JSON.stringify({
          total: totalPrice,
          cart_id: cart.cart_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.sessionUrl; // Rediriger vers l'URL du checkout
      } else {
        console.error('Failed to create checkout:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  return (
    <div>
      <Typography variant="h1">Cart</Typography>
      {cart && cart.products && cart.products.length > 0 ? (
        <div>
          <Typography variant="h2">Cart Products:</Typography>
          <List>
            {cart.products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText 
                  primary={`Name: ${product.product.name}`} 
                  secondary={`Price: ${isNaN(product.product.price) ? 'N/A' : product.product.price * ( 1)}`} 
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => adjustQuantity(product.product.id, product.cart_product_id, -1)} aria-label="remove">
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1">{typeof product.quantity === 'number' ? product.quantity : 1}</Typography>
                  <IconButton onClick={() => adjustQuantity(product.product.id, product.cart_product_id, 1)} aria-label="add">
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveFromCart(product.product.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant="h3">Total Price: {totalPrice}</Typography>
          <Button variant="contained" color="primary" onClick={handlePayment}>Payer mon panier</Button>
        </div>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </div>
  );
};

export default ShowCart
