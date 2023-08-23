import { updateOrder } from "../../services/order.services";
import { ExpirationConsumerEnum, OrderStatusEnum } from "../../types/enum";
import log from "../../utils/logger";

export async function expirationConsumer (queueName: string, message: any) {
    try {
        if (queueName === ExpirationConsumerEnum.Completed) {
            await expirationCompletedConsumer(message);
        }
    } catch (error: any) {
        log.error({ message: "Error while consuming expiration", error });
    }
}

async function expirationCompletedConsumer (message: any) {
    try {
        const { order, error } = await updateOrder(message.createdBy, message.id, OrderStatusEnum.Cancelled);

        if (error) {
            log.error({ message: "Error while expiring order", error });
            return;
        }

        log.info({ message: "Order expired", order });
    } catch (error: any) {
        log.error({ message: "Error while expiring order", error });
    }
}