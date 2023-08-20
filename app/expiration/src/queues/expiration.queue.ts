import Queue from "bull";
import { ExpirationPublisherEnum } from "../types/enum";
import { orderExpiredPublisher } from "../events/publisher/order.publisher";

const expirationQueue = new Queue(ExpirationPublisherEnum.Completed, 'redis://redis-srv:6379');

expirationQueue.process(async function(job) {
    await orderExpiredPublisher(job.data);
});

export { expirationQueue };