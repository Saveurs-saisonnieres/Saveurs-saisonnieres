import { API_URL_PRODUCTS } from "../constants";
import axios from "axios";
import Cookie from "js-cookie";

export function GetProducts() {
  return axios.get(API_URL_PRODUCTS);
}

export async function GetProductDatafetch(productId) {
  try {
    const response = await axios.get(`${API_URL_PRODUCTS}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product data");
  }
}

export async function AddProductfetch(productData) {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("origin", productData.origin);
  formData.append("variety", productData.variety);
  formData.append("image", productData.image);
  formData.append("isAdmin", productData.isAdmin);

  try {
    const response = await axios.post(API_URL_PRODUCTS, formData, {
      params: {
        isAdmin: productData.isAdmin,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token"),
      },
      product: {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        origin: productData.origin,
        variety: productData.variety,
      },
    });

    if (response.status === 201) {
      const productId = response.data.id;
      const imageFormData = new FormData();
      imageFormData.append("image", productData.image);

      const imageResponse = await axios.post(
        `${API_URL_PRODUCTS}/${productId}/product_images`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: Cookie.get("token"),
          },
          params: {
            isAdmin: productData.isAdmin,
          },
        }
      );

      console.log("Réponse de téléchargement d'image:", imageResponse);
      return response;
    } else {
      throw new Error("La création du produit a échoué.");
    }
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw error;
  }
}

export async function DeleteProductfetch(productId, isAdmin) {
  try {
    const response = await axios.delete(`${API_URL_PRODUCTS}/${productId}`, {
      params: {
        isAdmin: isAdmin,
      },
      headers: {
        Authorization: Cookie.get("token"),
      },
    });
    console.log("Produit supprimé avec succès.");
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw new Error("La suppression du produit a échoué.");
  }
}

export async function EditProduct(productId, updatedProductData, isAdmin) {
  const formData = new FormData();
  formData.append("name", updatedProductData.name);
  formData.append("price", updatedProductData.price);
  formData.append("description", updatedProductData.description);
  formData.append("origin", updatedProductData.origin);
  formData.append("variety", updatedProductData.variety);
  formData.append("image", updatedProductData.image);
  formData.append("isAdmin", isAdmin);

  try {
    const response = await axios.put(
      `http://localhost:3000/products/${productId}`,
      formData,
      {
        params: {
          isAdmin: isAdmin,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Produit édité avec succès.");
    return response;
  } catch (error) {
    console.error("Erreur lors de l'édition du produit:", error);
    throw new Error("L'édition du produit a échoué.");
  }
}
