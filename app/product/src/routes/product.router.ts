import express from "express";
import { createProductHandler, getProductsHandler, getMyProductsHandler, getProductHandler, updateProductHandler } from "../controllers/product.controller";
import validate from "../middlewares/validateResources";
import { createProductSchema, updateProductSchema } from "../schema/product.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/product", authMiddleware, validate(createProductSchema), createProductHandler);

router.get("/api/product", getProductsHandler);

router.get("/api/product/me", authMiddleware, getMyProductsHandler);

router.get("/api/product/:productId", authMiddleware, getProductHandler);

router.put("/api/product/:productId", authMiddleware, validate(updateProductSchema), updateProductHandler);

export default router;