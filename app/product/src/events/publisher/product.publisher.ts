import log from '../../utils/logger';
import { basePublisher } from './base.publisher';

export async function productCreatedPublisher (queueName: string, data: any) {
    try {
        const { message, error } = await basePublisher(queueName, data);

        if (error) {
            log.info(error);
            return;
        }

        log.info(message);
        return;
    } catch (error: any) {
        log.error(error.message);
        return;
    }
}