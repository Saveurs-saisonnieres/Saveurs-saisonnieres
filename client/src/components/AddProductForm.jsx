import { useState } from "react";
import { AddProductfetch } from "../services/productService";

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
  const [, setSubmitting] = useState(false);
  const [, setError] = useState(null);
  const [, setSuccess] = useState(false);

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
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Données du produit:", productData);
      await AddProductfetch(productData);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
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
