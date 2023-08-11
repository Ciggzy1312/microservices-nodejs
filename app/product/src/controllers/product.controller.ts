import { Request, Response } from "express";
import { createProduct, getProducts, getMyProducts } from "../services/product.services";
import log from "../utils/logger";

const createProductHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { product, error } = await createProduct(req.body, id);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Product created successfully`);
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        log.error({ message: "Product creation failed", error });
        res.status(400).json({ message: "Product creation failed" });
    }
}

const getProductsHandler = async (req: Request, res: Response) => {
    try {
        const { products, error } = await getProducts();
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Products fetched successfully`);
        return res.status(201).json({ message: "Products fetched successfully", products });
    } catch (error) {
        log.error({ message: "Product fetching failed", error });
        res.status(400).json({ message: "Product fetching failed" });
    }
}

const getMyProductsHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { products, error } = await getMyProducts(id);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Products fetched of logged in user successfully");
        return res.status(201).json({ message: "Products fetched of logged in user successfully", products });
    } catch (error) {
        log.error({ message: "Product fetching of logged in user failed", error });
        res.status(400).json({ message: "Product fetching of logged in user failed" });
    }
}

export { createProductHandler, getProductsHandler, getMyProductsHandler }