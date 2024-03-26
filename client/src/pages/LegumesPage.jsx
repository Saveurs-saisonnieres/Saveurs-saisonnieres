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
import { AddProductToCart } from "../services/cartServices";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LegumePage = () => {
  const [legumeProducts, setLegumeProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const productsPerLine = 4;

  useEffect(() => {
    const fetchLegumeProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products?category=Legumes");
        setLegumeProducts(response.data);
      } catch (error) {
        console.error("Error fetching legume products:", error);
      }
    };

    fetchLegumeProducts();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderPaginationItem = (item) => (
    <PaginationItem
      component={Link}
      to={`/legumes?page=${item.page}`}
      {...item}
    />
  );

  return (
    <div
      style={{
        margin: "0 300px",
        padding: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {legumeProducts
          .slice((page - 1) * productsPerPage, page * productsPerPage)
          .map((product, index) => (
            <Card
              key={index}
              style={{
                marginBottom: "50px",
                maxWidth: "300px",
                minWidth: "200px",
                marginLeft: "auto",
                marginRight: "20px",
                width: `${200 / productsPerLine}%`,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={"http://localhost:3000/" + product.img_url}
                title={product.name}
              />
              <CardContent style={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Variété: {product.variety}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Origine : {product.origin}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Description: {product.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Prix : {product.price} €
                </Typography>
              </CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", 
                  padding: "10px", 
                }}
              >
              <Button
                component={Link}
                to={`/product/${product.id}`}
                variant="contained"
                style={{
                  backgroundColor: "#DEDEDE",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#BFBFBF"
                  }
                }}
                size="small"
              >
                Détails
              </Button>

                <Button
                  onClick={() => AddProductToCart(product.id)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{
                    borderRadius: "5px",
                    marginLeft: "auto", 
                  }}
                >
                  <ShoppingCartIcon style={{ color: "white" }} />
                </Button>
              </div>
            </Card>
          ))}
      </div>
      <Pagination
        count={Math.ceil(legumeProducts.length / productsPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={renderPaginationItem}
      />
    </div>
  );
};

export default LegumePage;
