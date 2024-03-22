import { useState, useEffect } from "react";
import axios from "axios";
import { AddProductToCart } from "../services/cartServices";

const ShowProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Origin: {product.origin}</p>
              <p>Variety: {product.variety}</p>
              {product.img_url && (
                <img src={"http://localhost:3000/" + product.img_url} alt="Product" />
              )}
              <button onClick={() => AddProductToCart(product.id)}>Add to cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowProducts;
