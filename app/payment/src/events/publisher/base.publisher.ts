import amqp from 'amqplib';

const connectURL = "amqp://rabbitmq-srv:5672";

export async function basePublisher (queueName: string, data: any) {
    try {
        const connection = await amqp.connect(connectURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

        return { message: `Message published to ${queueName}`, error: null};
    } catch (error: any) {
        return { error: `Error publishing message to ${queueName}` };
    }
}