import { ProductPublisherEnum } from '../../types/enum';
import { basePublisher } from './base.publisher';
import log from '../../utils/logger';

export async function productCreatedPublisher (data: any) {
    try {
        const queueName = ProductPublisherEnum.Created;
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

export async function productUpdatedPublisher (data: any) {
    try {
        const queueName = ProductPublisherEnum.Updated;
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