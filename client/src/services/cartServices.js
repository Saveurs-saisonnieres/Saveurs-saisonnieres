import axios from "axios";
import { API_URL_CART } from "../constants";
import Cookie from "js-cookie";
export async function GetCart() {
  try {
    const response = await axios.get(API_URL_CART, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token")
      }
    });

    console.log('Cart:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error; 
  }
}
export async function AddProductToCart(productId) {
  try {
    const response = await axios.post("http://localhost:3000/add_to_cart", {
      productId: productId // Envoyer l'ID du produit dans le corps de la requête
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token")
      }
    });
    console.log('Product added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
}

export async function RemoveFromCart(productId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/cart_products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token")
      }
    });

    console.log('Product removed from cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
}

