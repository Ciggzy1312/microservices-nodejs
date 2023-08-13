import { OrderPublisherEnum } from '../../types/enum';
import { basePublisher } from './base.publisher';
import log from '../../utils/logger';

export async function orderCreatedPublisher (order: any, product: any) {
    try {
        const queueName = OrderPublisherEnum.Created;
        const data = {
            _id: order._id,
            status: order.status,
            expiresAt: order.expiresAt.toISOString(),
            createdBy: order.createdBy,
            productId: {
                _id: product._id,
                name: product.name,
                price: product.price
            }
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

export async function orderCancelledPublisher (order: any) {
    try {
        const queueName = OrderPublisherEnum.Cancelled;
        const data = {
            _id: order._id,
            status: order.status,
            productId: order.productId
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