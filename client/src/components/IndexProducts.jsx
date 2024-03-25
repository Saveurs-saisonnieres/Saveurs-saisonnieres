import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AddProductToCart } from "../services/cartServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 9; 
  const productsPerLine = 3; 

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderPaginationItem = (item) => (
    <PaginationItem
      component={Link}
      to={`/products?page=${item.page}`}
      {...item}
    />
  );

  return (
    <div style={{ margin: "0 300px", padding: "100px", display: "flex", flexDirection: "column", alignItems: "center"}}> 
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px"}}>
        {products.slice((page - 1) * productsPerPage, page * productsPerPage).map((product, index) => (
          <Card key={product.id} style={{ marginBottom: "20px", maxWidth: "300px", minWidth: "200px", marginLeft: "auto", marginRight: "auto", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", width: `${100 / productsPerLine}%` }}>
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
                Variety: {product.variety}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Origin: {product.origin}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Description: {product.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Price: {product.price}
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <Button component={Link} to={`/product/${product.id}`} variant="contained" color="primary" size="small">
                  Voir détails
                </Button>
                <Button onClick={() => AddProductToCart(product.id)} variant="contained" color="secondary" size="small">
                  <ShoppingCartIcon />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={renderPaginationItem}
      />
    </div>
  );
};

export default ProductList;
