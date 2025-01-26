import express from "express";

import { addProduct, deleteProduct, getProdcut, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProdcut);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;