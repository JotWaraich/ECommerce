import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        _id: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
