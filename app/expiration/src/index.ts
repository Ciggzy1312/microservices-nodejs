import { baseConsumer } from "./events/consumer/base.consumer";
import { OrderConsumerEnum } from "./types/enum";
import log from "./utils/logger";

const start = async () => {
    baseConsumer(OrderConsumerEnum.Created);

    log.info("Expiration service is running...");
};

start();