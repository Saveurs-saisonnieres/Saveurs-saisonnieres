import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddProductToCart } from "../services/cartServices";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product) => (
        <Card key={product.id} style={{ maxWidth: "300px", minWidth: "200px" }}>
          <CardMedia
            component="img"
            alt={product.name}
            height="200"
            image={"http://localhost:3000/" + product.img_url}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Description: {product.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Origin: {product.origin}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Variety: {product.variety}
            </Typography>
            <Button component={Link} to={`/product/${product.id}`} variant="contained" color="primary">
              View Details
            </Button>
            <Button onClick={() => AddProductToCart(product.id)} variant="contained" color="secondary">
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
