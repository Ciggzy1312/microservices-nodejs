import amqp from 'amqplib';
import log from '../../utils/logger';
import { productCreatedConsumer } from './product.consumer';

const connectURL = "amqp://rabbitmq-srv:5672";

export async function baseConsumer (queueName: string) {
    try {
        const connection = await amqp.connect(connectURL);
        const channel = await connection.createChannel();

        let message

        await channel.assertQueue(queueName);
        await channel.consume(queueName, async (msg) => {
            if (msg) {
                message = JSON.parse(msg.content.toString());
                console.log("msg -> ", message);

                if (queueName === "product.created") {
                    await productCreatedConsumer(message);
                    channel.ack(msg);
                }
            }
        });

    } catch (error: any) {
        log.error({ message: "Error while connecting to RabbitMQ", error});
    }
}