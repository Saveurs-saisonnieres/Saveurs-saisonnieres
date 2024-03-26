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

const FruitsPage = () => {
  const [fruits, setFruits] = useState([]);
  const [page, setPage] = useState(1);
  const fruitsPerPage = 12;
  const fruitsPerLine = 4;

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products?category=Fruits");
        setFruits(response.data);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    };

    fetchFruits();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderPaginationItem = (item) => (
    <PaginationItem
      component={Link}
      to={`/fruits?page=${item.page}`}
      {...item}
    />
  );
console.log(fruits);

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
        {fruits
          .slice((page - 1) * fruitsPerPage, page * fruitsPerPage)
          .map((fruit, index) => (
            <Card
              key={index}
              style={{
                marginBottom: "50px",
                maxWidth: "300px",
                minWidth: "200px",
                marginLeft: "auto",
                marginRight: "20px",
                width: `${200 / fruitsPerLine}%`,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                alt={fruit.name}
                height="200"
                image={"http://localhost:3000/" + fruit.img_url}
                title={fruit.name}
              />
              <CardContent style={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {fruit.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Variété: {fruit.variety}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Origine : {fruit.origin}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Description: {fruit.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Prix : {fruit.price} €
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
                to={`/product/${fruit.id}`}
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
                  onClick={() => AddProductToCart(fruit.id)}
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
        count={Math.ceil(fruits.length / fruitsPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={renderPaginationItem}
      />
    </div>
  );
};

export default FruitsPage;