import express from "express";
import { createOrderHandler, getOrdersHandler } from "../controllers/order.controller";
import validate from "../middlewares/validateResources";
import { createOrderSchema } from "../schema/order.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/order", authMiddleware, validate(createOrderSchema), createOrderHandler);

router.get("/api/order", authMiddleware, getOrdersHandler);

export default router;