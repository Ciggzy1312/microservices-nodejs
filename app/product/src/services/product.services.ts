import log from "../utils/logger";
import { ProductInput } from "../types/types";
import { Product } from "../models/product.model";
import { productPublisher } from "../events/publisher/product.publisher";

export const createProduct = async (input: ProductInput, id: string) => {
    try {
        input.createdBy = id;
        const product = await Product.create(input);

        await productPublisher("product.created", product, "Product created event sent", "Product created event sending failed");

        return { product, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Product creation failed" };
    }
}

export const getProducts = async () => {
    try {
        const products = await Product.find({});
        return { products, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Products fetching failed" };
    }
}

export const getMyProducts = async (id: string) => {
    try {
        const products = await Product.find({ createdBy: id });
        return { products, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Products fetching of logged in user failed" };
    }
}