import amqp from 'amqplib';
import log from '../../utils/logger';

const connectURL = "amqp://rabbitmq-srv:5672";

export async function productPublisher (queueName: string, data: any, message: string, errorMessage: string) {
    try {
        const connection = await amqp.connect(connectURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ data })));

        log.info(message);
    } catch (error: any) {
        log.error(errorMessage);
    }
}