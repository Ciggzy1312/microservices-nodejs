import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
},{ _id : false });

export const Product = mongoose.model("Product", productSchema);