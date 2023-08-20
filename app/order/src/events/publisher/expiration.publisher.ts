import { ExpirationPublisherEnum } from '../../types/enum';
import { basePublisher } from './base.publisher';
import log from '../../utils/logger';

export async function expirationCreatedPublisher (order: any) {
    try {
        const queueName = ExpirationPublisherEnum.Created;

        const data = {
            id: order._id,
            expiresAt: order.expiresAt.toISOString(),
            createdBy: order.createdBy,
        }
        
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