import express from 'express';
import cookieParser from 'cookie-parser';
import log from './utils/logger';
import connectDB from './utils/connect';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(8004, async () => {
    log.info('Payment service is running on port 8004');
    await connectDB();
});