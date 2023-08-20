import { ExpirationPublisherEnum } from '../../types/enum';
import { basePublisher } from './base.publisher';
import log from '../../utils/logger';

export async function orderExpiredPublisher (order: any) {
    try {
        const queueName = ExpirationPublisherEnum.Completed;
        const data = {
            id: order.id,
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