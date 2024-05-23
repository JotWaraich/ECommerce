import express from "express";
import multer from "multer";

import {
  addItem,
  getItems,
  getItemByCategory,
} from "../controllers/item.controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/add", upload.array("avatar"), addItem);
router.post("/get", getItems);
router.post("/getByCategory", getItemByCategory);

export default router;
