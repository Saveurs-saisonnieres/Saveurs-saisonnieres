import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // Utilisation de useParams pour extraire l'ID du produit de l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
        console.log("Product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Utilisation de l'ID comme dépendance de l'effet useEffect

  return (
    <div>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <p>Origin: {product.origin}</p>
          <p>Variety: {product.variety}</p>
          {product.img_url && (
            <img
              src={"http://localhost:3000/" + product.img_url}
              alt="Product"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
