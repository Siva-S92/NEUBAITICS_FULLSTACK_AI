import express from "express";
import { createProducts, getProductbyId, getProducts } from "../controllers/product.js";



const router  = express.Router();

router.post("/create-products", createProducts)
router.get("/get-products", getProducts)
router.get("/get-product/:id", getProductbyId)


export const productRouter = router;