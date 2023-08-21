import express from "express";
import productRouter from "./payment.router";

const router = express.Router();

router.use(productRouter);

export default router;