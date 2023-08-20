import express from 'express';
import cookieParser from 'cookie-parser';
import log from './utils/logger';
import connectDB from './utils/connect';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes';
import { baseConsumer } from './events/consumer/base.consumer';
import { ExpirationConsumerEnum, ProductConsumerEnum } from './types/enum';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(router);

baseConsumer(ProductConsumerEnum.Created);
baseConsumer(ProductConsumerEnum.Updated);
baseConsumer(ExpirationConsumerEnum.Completed);

app.listen(8002, async () => {
    log.info('Order service is running on port 8002');
    await connectDB();
});