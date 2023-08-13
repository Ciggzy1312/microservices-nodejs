import log from "../utils/logger";
import { ProductInput } from "../types/types";
import { Product } from "../models/product.model";
import { productCreatedPublisher, productUpdatedPublisher } from "../events/publisher/product.publisher";

export const createProduct = async (input: ProductInput, id: string) => {
    try {
        input.createdBy = id;
        const product = await Product.create(input);

        await productCreatedPublisher(product);

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

export const getProduct = async (productId: string) => {
    try {
        const product = await Product.findById(productId);

        return { product, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Product fetching failed" };
    }
}

export const updateProduct = async (id: string, productId: string, input: ProductInput) => {
    try {
        const product = await Product.findByIdAndUpdate(productId, input, { new: true }).where({ createdBy: id });
        if (!product) {
            return { error: "Product not found or not authorized to access product" };
        }

        await productUpdatedPublisher(product);

        return { product, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Product updation failed" };
    }
}