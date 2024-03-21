import { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    variety: "",
    image: null, // Modifier image en image
    isAdmin: localStorage.getItem("useradmin") === "true" ? true : false,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setProductData({
      ...productData,
      image: event.target.files[0], // Modifier image en image
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("origin", productData.origin);
    formData.append("variety", productData.variety);
    formData.append("image", productData.image);
    formData.append("isAdmin", productData.isAdmin);

    try {
      console.log("Données du produit:", productData);

      const response = await axios.post(
        "http://localhost:3000/products",
        formData,
        {
          params: {
            isAdmin: productData.isAdmin,
          },
          headers: {
            "Content-Type": "application/json",
          },
          product: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            origin: productData.origin,
            variety: productData.variety,
          },
        }
      );
      console.log("Réponse de création de produit:", response);

      if (response.status === 201) {
        console.log("Produit créé avec succès");
        // Récupérez l'ID du produit créé
        const productId = response.data.id;
        console.log("ID du produit créé:", productId);

        // Ensuite, envoyez la requête POST pour télécharger l'image
        const imageFormData = new FormData();
        imageFormData.append("image", productData.image);

        const imageResponse = await axios.post(
          `http://localhost:3000/products/${productId}/product_images`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Réponse de téléchargement d'image:", imageResponse);
      }
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Prix:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Origine:</label>
        <input
          type="text"
          name="origin"
          value={productData.origin}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Variété:</label>
        <input
          type="text"
          name="variety"
          value={productData.variety}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Créer le produit</button>
    </form>
  );
};

export default AddProductForm;
