import express from "express";
import validate from "../middlewares/validateResources";
import { createPaymentSchema } from "../schema/payment.schema";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/api/payment", authMiddleware, validate(createPaymentSchema), (req, res) => {
    res.send("Payment created");
});

export default router;