import { updateOrder } from "../../services/order.services";
import { PaymentConsumerEnum, OrderStatusEnum } from "../../types/enum";
import log from "../../utils/logger";

export async function paymentConsumer (queueName: string, message: any) {
    try {
        if (queueName === PaymentConsumerEnum.Success) {
            await paymentCompletedConsumer(message);
        }
    } catch (error: any) {
        log.error({ message: "Error while consuming payment", error });
    }
}

async function paymentCompletedConsumer (message: any) {
    try {
        const { order, error } = await updateOrder(message.createdBy, message.orderId, OrderStatusEnum.Completed);

        if (error) {
            log.error({ message: "Error while updating paid order status", error });
            return;
        }

        log.info({ message: "Order paid for successfully", order });
    } catch (error: any) {
        log.error({ message: "Error while updating order status to complete", error });
    }
}