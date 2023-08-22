import { Order } from "../../models/order.model";
import { OrderConsumerEnum } from "../../types/enum";
import log from "../../utils/logger";


export async function orderConsumer (queueName: string, message: any) {
    try {
        if (queueName === OrderConsumerEnum.Created) {
            await paymentCreatedConsumer(message);
        }
    } catch (error: any) {
        log.error({ message: "Error while consuming product", error });
    }
}

async function paymentCreatedConsumer (message: any) {
    try {
        const order = await Order.create({
            _id: message._id,
            price: message.price,
            status: message.status,
            createdBy: message.createdBy,
        })

        log.info({ message: "Order for payment created successfully", order });
    } catch (error: any) {
        log.error({ message: "Error while create order event", error });
    }
}