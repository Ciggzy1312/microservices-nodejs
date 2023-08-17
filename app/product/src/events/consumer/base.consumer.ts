import amqp from 'amqplib';
import log from '../../utils/logger';
import { orderConsumer } from './order.consumer';
import { ConsumerTypeEnum } from '../../types/enum';

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

                if (queueName.split(":")[0] === ConsumerTypeEnum.Order) {
                    await orderConsumer(queueName, message);
                    channel.ack(msg);
                }
            }
        });

    } catch (error: any) {
        log.error({ message: "Error while connecting to RabbitMQ", error});
    }
}