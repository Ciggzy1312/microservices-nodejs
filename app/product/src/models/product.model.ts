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
});

export const Product = mongoose.model("Product", productSchema);