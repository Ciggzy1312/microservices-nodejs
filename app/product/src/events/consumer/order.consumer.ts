import { Product } from "../../models/product.model";
import { OrderConsumerEnum } from "../../types/enum";
import log from "../../utils/logger";


export async function orderConsumer (queueName: string, message: any) {
    try {
        if (queueName === OrderConsumerEnum.Created) {
            await orderCreatedConsumer(message);
        }
        else if (queueName === OrderConsumerEnum.Cancelled) {
            await orderCancelledConsumer(message);
        }
    } catch (error: any) {
        log.error({ message: "Error while consuming product", error });
    }
}

async function orderCreatedConsumer (message: any) {
    try {
        const product = await Product.findByIdAndUpdate(message.productId._id, { orderId: message._id }, { new: true });

        if (!product) {
            log.error({ message: "Product not found" });
            return;
        }

        log.info({ message: "Order created event consumed successfully", product });
    } catch (error: any) {
        log.error({ message: "Error while create order event", error });
    }
}

async function orderCancelledConsumer (message: any) {
    try {
        const product = await Product.findByIdAndUpdate(message.productId, { orderId: null }, { new: true });

        if (!product) {
            log.error({ message: "Product not found" });
            return;
        }

        log.info({ message: "Order cancelled event consumed successfully", product });
    } catch (error: any) {
        log.error({ message: "Error while cancel order event", error });
    }
}