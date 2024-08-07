import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Card from "../components/Cards";
import { Slides } from "../Data/CarouselData.json";
import ListItem from "./Admin";
import Search from "./Search";
import CarouselPage from "../components/CarouselPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Line from "@/components/ui/line";

const Home = () => {
  const [item, setItem] = useState([]);
  const [cart, setCart] = useState([]);
  const [id, setId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleClick = (item) => {
    setCart([...cart, item]);
  };

  const getItems = async () => {
    try {
      const response = await fetch("/api/items/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setItem(data.filter((item) => item.show));
      console.log(data);
    } catch (error) {
      console.log("error getting items", error);
    }
  };

  useEffect(() => {
    getItems();
    setId(localStorage.getItem("id"));
  }, []);

  return (
    <div>
      <div className="mb-44">
        <Navbar />
        <Line />
      </div>
      <CarouselPage setSearchResults={setSearchResults} />
      <div className="text-3xl font-bold mb-10 mt-10 text-center">
        <h1>Our Products</h1>
      </div>
      {/* Only show the Card component with items if there are no search results */}
      {searchResults.length === 0 ? (
        <Card items={item} />
      ) : (
        <Card items={searchResults} />
      )}
      <Footer />
    </div>
  );
};

export default Home;
