"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import useUploadItem from "../../hooks/useUploadItem";

const Home = () => {
  const { loading, add } = useUploadItem();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImageName, setItemImageName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStock, setItemStock] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await add({
      itemName,
      itemPrice,
      itemImageName,
      itemCategory,
      itemDescription,
      itemStock,
    });
  };
  return (
    <div className="flex">
      Home
      <form
        // onSubmit={handleSubmit}
        action="/api/items/add"
        method="post"
        enctype="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Write item name"
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Write item price"
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <input
          type="file"
          name="itemImageName"
          onChange={(e) => setItemImageName(e.target.value)}
          multiple
        />
        <input
          type="text"
          placeholder="Write item catagory"
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Write item description"
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Write number of items in stock"
          onChange={(e) => setItemStock(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Home;
