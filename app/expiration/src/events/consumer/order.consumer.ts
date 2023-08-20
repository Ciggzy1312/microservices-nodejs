import { expirationQueue } from "../../queues/expiration.queue";
import { OrderConsumerEnum } from "../../types/enum";
import log from "../../utils/logger";


export async function orderConsumer (queueName: string, message: any) {
    try {
        if (queueName === OrderConsumerEnum.Created) {
            await expirationCreatedConsumer(message);
        }
    } catch (error: any) {
        log.error({ message: "Error while consuming order", error });
    }
}

async function expirationCreatedConsumer (message: any) {
    try {
        const delay = new Date(message.expiresAt).getTime() - new Date().getTime();

        await expirationQueue.add({
            id: message.id,
            createdBy: message.createdBy,
        }, {
            delay
        });

        log.info({ message: "Expiration job created" });
    } catch (error: any) {
        log.error({ message: "Error while creating expiration job", error });
    }
}