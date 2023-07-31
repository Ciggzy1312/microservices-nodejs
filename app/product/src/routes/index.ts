import express from "express";
import productRouter from "./product.router";

const router = express.Router();

router.use(productRouter);

export default router;