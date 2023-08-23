import amqp from 'amqplib';
import log from '../../utils/logger';
import { productConsumer } from './product.consumer';
import { ConsumerTypeEnum } from '../../types/enum';
import { expirationConsumer } from './expiration.consumer';
import { paymentConsumer } from './payment.consumer';

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

                if (queueName.split(":")[0] === ConsumerTypeEnum.Product) {
                    await productConsumer(queueName, message);
                    channel.ack(msg);
                }
                else if (queueName.split(":")[0] === ConsumerTypeEnum.Expiration) {
                    await expirationConsumer(queueName, message);
                    channel.ack(msg);
                }
                else if (queueName.split(":")[0] === ConsumerTypeEnum.Payment) {
                    await paymentConsumer(queueName, message);
                    channel.ack(msg);
                }
            }
        });

    } catch (error: any) {
        log.error({ message: "Error while connecting to RabbitMQ", error});
    }
}