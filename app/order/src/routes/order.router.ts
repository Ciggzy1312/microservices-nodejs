import express from "express";
import { createOrderHandler, getOrdersHandler, getOrderHandler, cancelOrderHandler } from "../controllers/order.controller";
import validate from "../middlewares/validateResources";
import { createOrderSchema } from "../schema/order.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/order", authMiddleware, validate(createOrderSchema), createOrderHandler);

router.get("/api/order", authMiddleware, getOrdersHandler);

router.get("/api/order/:orderId", authMiddleware, getOrderHandler);

router.delete("/api/order/:orderId", authMiddleware, cancelOrderHandler);

export default router;