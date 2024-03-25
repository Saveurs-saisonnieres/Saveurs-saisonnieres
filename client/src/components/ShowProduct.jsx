import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AddProductToCart } from "../services/cartServices";

const ShowProduct = () => {
  const { id } = useParams();
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
  }, [id]);

  return (
    <div>
      <h2>Product Details</h2>
      {product && (
        <div>
          <h3>{product.name}</h3>
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
          <button onClick={() => AddProductToCart(product.id)}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
