import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        default: null,
    }
});

export const Product = mongoose.model("Product", productSchema);