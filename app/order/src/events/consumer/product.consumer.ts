import { Product } from "../../models/product.model";
import log from "../../utils/logger";


export async function productCreatedConsumer (message: any) {
    try {
        const product = await Product.create({
            _id: message._id,
            name: message.name,
            price: message.price,
        });

        log.info({ message: "Product of order created successfully", product });
    } catch (error: any) {
        log.error({ message: "Error while creating product of order", error });
    }
}