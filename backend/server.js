import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRoutes from "./routes/auth.routes.js";
import itemsRoutes from "./routes/items.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // from req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
