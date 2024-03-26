// AddProductForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddProductfetch } from "../services/productService";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

const AddProductForm = () => {
  const navigate = useNavigate(); // Initialisez le hook useNavigate
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    variety: "",
    image: null,
    isAdmin: Cookies.get("useradmin"),
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
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Product data:", productData);
      await AddProductfetch(productData);
      console.log("Produit ajouté avec succès.");
      setSuccess(true);
      navigate("/admin/products"); // Redirection vers la page AdminProduct
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  console.log(productData);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          align="center"
          gutterBottom
        >
          Ajouter un produit
        </Typography>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Nom</InputLabel>
          <Input
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Prix</InputLabel>
          <Input
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            type="number"
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Description</InputLabel>
          <Input
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            multiline
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Origine</InputLabel>
          <Input
            name="origin"
            value={productData.origin}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <InputLabel>Variété</InputLabel>
          <Input
            name="variety"
            value={productData.variety}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <Input
            type="file"
            id="image-upload"
            onChange={handleFileChange}
            required
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Créer le produit
        </Button>
      </form>
    </Box>
  );
};

export default AddProductForm;
