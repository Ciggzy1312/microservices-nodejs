import express from "express";
import { createProductHandler, getProductsHandler, getMyProductsHandler } from "../controllers/product.controller";
import validate from "../middlewares/validateResources";
import { createProductSchema } from "../schema/product.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/product", authMiddleware, validate(createProductSchema), createProductHandler);

router.get("/api/product", getProductsHandler);

router.get("/api/product/me", authMiddleware, getMyProductsHandler);

export default router;