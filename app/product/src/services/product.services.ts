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
        const productExist = await Product.findById(productId)
        if (!productExist) {
            return { error: "Product not found" };
        }

        if (productExist.createdBy !== id) {
            return { error: "Not authorized to access product" };
        }

        if (productExist.orderId) {
            return { error: "Product is reserved, wait for it to expire" };
        }

        const product = await Product.findByIdAndUpdate(productId, input, { new: true });

        await productUpdatedPublisher(product);

        return { product, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Product updation failed" };
    }
}