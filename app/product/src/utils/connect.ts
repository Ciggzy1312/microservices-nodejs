import mongoose from "mongoose";
import log from "./logger";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://product-db-srv:27017/product");
        log.info("Successfully connected to product database");
    } catch (error) {
        log.error("Error connecting to product database: ", error);
    }
}

export default connectDB;