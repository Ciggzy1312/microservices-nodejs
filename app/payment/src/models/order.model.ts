import mongoose from "mongoose";
import { OrderStatusEnum } from "../types/enum";

const orderSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatusEnum),
        default: OrderStatusEnum.Created,
    },
    price: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
},{ _id : false });

export const Order = mongoose.model("Order", orderSchema);