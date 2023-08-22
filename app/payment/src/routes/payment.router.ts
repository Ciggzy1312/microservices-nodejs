import express from "express";
import { createPaymentHandler } from "../controllers/payment.controller";
import validate from "../middlewares/validateResources";
import { createPaymentSchema } from "../schema/payment.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/api/payment", authMiddleware, validate(createPaymentSchema), createPaymentHandler);

export default router;