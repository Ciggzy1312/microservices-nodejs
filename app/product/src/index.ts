import express from 'express';
import cookieParser from 'cookie-parser';
import log from './utils/logger';
import connectDB from './utils/connect';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes';
import { baseConsumer } from './events/consumer/base.consumer';
import { OrderConsumerEnum } from './types/enum';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(router);

baseConsumer(OrderConsumerEnum.Created);
baseConsumer(OrderConsumerEnum.Cancelled);

app.listen(8001, async () => {
    log.info('Product service is running on port 8001');
    await connectDB();
});