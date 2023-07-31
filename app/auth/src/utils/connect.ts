import mongoose from "mongoose";
import log from "./logger";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://auth-db-srv:27017/user");
        log.info("Successfully connected to auth database");
    } catch (error) {
        log.error("Error connecting to auth database: ", error);
    }
}

export default connectDB;