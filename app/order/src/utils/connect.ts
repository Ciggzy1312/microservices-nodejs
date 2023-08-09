import mongoose from "mongoose";
import log from "./logger";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://order-db-srv:27017/order");
        log.info("Successfully connected to order database");
    } catch (error) {
        log.error("Error connecting to order database: ", error);
    }
}

export default connectDB;