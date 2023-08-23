import { PaymentPublisherEnum } from '../../types/enum';
import { basePublisher } from './base.publisher';
import log from '../../utils/logger';

export async function paymentCreatedPublisher (order: any, product: any) {
    try {
        const queueName = PaymentPublisherEnum.Created;

        const data = {
            _id: order._id,
            status: order.status,
            createdBy: order.createdBy,
            price: product.price,
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

export async function paymentExpiredPublisher (order: any) {
    try {
        const queueName = PaymentPublisherEnum.Expired;

        const data = {
            _id: order._id,
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