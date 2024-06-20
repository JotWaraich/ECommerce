//reference: https://www.google.com/search?sca_esv=b8996be4c462e1ec&sca_upv=1&rlz=1C1OPNX_enCA1057CA1057&sxsrf=ADLYWILNwRNlDNp1RIm4pU8diULUBW20LA:1718222177946&q=how+to+create+cards+when+data+is+being+fetched+from+api&tbm=vid&source=lnms&fbs=AEQNm0DVrIRjdA3gRKfJJ-deMT8ZtYOjoIt1NWOMRkEKym4u5PkAZgxJOmIgPx6WieMhF6q1Hq7W6nME2Vp0eHuijF3ZElaTgD0zbj1gkQrti2r6HtU_FSIC_TOIRePmNlS6X7JM5HBW5XbZDBZ4_7u7u_1S0lBKWZanVrzOMi5iZT88U7e3_wgsAQOPU_p9Gb66BSsVUXKxPRPH2pqhwDp-oi5jONlpDQ&sa=X&ved=2ahUKEwiV7b607NaGAxWwADQIHakRAsYQ0pQJegQIDBAB&biw=1396&bih=632&dpr=1.38#fpstate=ive&vld=cid:15d3deed,vid:RYF4_pqhS38,st:0
// to run this install : npm install @mui/material @emotion/react @emotion/styled

// src/components/ItemGrid.js
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { set } from "mongoose";

// Used Chat gpt for truncate text

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const Cards = ({ items, handleClick }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = async (item) => {
    const data = await fetch("/api/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "hello@gmail.com",
        cartItems,
      }),
    });
    setCartItems([...cartItems, item]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
  };
  return (
    <div
      className="flex flex-wrap justify-center h-1 mt-12"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {items.length > 0 ? (
        items.map((item) => (
          <Card key={item.name} style={{ margin: 16, maxWidth: 345 }}>
            <CardMedia
              component="img"
              image={`/api/items/images/${item.image}`}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", color: "black" }}
              >
                {truncateText(item.description, 8)}
              </Typography>
              <div style={{ marginTop: 10 }}>
                {" "}
                {/* Add margin top to create space between description and price */}
                <Typography variant="h6" color="text.primary">
                  {`${item.price} $`}
                </Typography>
              </div>
              <Button
                onClick={() => addToCart(item)}
                size="small"
                color="primary"
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red", // darken color on hover if needed
                  },
                  marginTop: 3,
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h7" color="text.secondary">
          No items found.
        </Typography>
      )}
    </div>
  );
};

export default Cards;
