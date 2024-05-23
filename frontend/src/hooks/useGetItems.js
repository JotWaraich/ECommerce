import { useState } from "react";
import toast from "react-hot-toast";

const UseGetItems = async () => {
  const [loading, setLoading] = useState(false);
  setLoading(true);
  try {
    const response = await fetch("/api/items/get");
    const data = await response.json();
    return { loading, data };
  } catch (error) {
    toast.error("Error fetching items");
  } finally {
    setLoading(false);
  }
};
export default UseGetItems;
