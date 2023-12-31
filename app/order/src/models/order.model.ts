import mongoose from "mongoose";
import { OrderStatusEnum } from "../types/enum";

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatusEnum),
        default: OrderStatusEnum.Created,
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
    },
    createdBy: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
});

export const Order = mongoose.model("Order", orderSchema);