import React, { useState } from "react";

const useUploadItem = async () => {
  const [loading, setLoading] = useState(false);

  const add = async ({
    itemName,
    itemPrice,
    itemImageName,
    itemCategory,
    itemDescription,
    itemStock,
  }) => {
    setLoading(true);
    const sucess = handleInputErrors({
      itemName,
      itemPrice,
      itemImageName,
      itemCategory,
      itemDescription,
      itemStock,
    });
    if (!sucess) return;

    try {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("itemPrice", itemPrice);
      formData.append("itemImage", itemImage);
      formData.append("itemCategory", itemCategory);
      formData.append("itemDescription", itemDescription);
      formData.append("itemStock", itemStock);

      const response = await fetch("/api/items/add", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Error fetching items");
    } finally {
      setLoading(false);
    }
  };
  return { loading, add };
};

export default useUploadItem;

const handleInputErrors = ({
  itemName,
  itemPrice,
  itemImageName,
  itemCategory,
  itemDescription,
  itemStock,
}) => {
  if (
    !itemName ||
    !itemPrice ||
    !itemCategory ||
    !itemDescription ||
    !itemStock
  ) {
    toast.error("All fields are required");
    return false;
  }
  return true;
};
