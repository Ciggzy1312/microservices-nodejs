import express from 'express';
import log from './utils/logger';

const app = express();

app.get('/api/user', (req, res) => {
    res.send('Hello from Auth service');
});

app.get('/api/user/', (req, res) => {
    res.send('Hello from Auth service with a / at the end');
});

app.get('/api/user/health', (req, res) => {
    res.send('Health check passed');
});

app.listen(8000, () => {
    log.info('Auth service is running on port 8000');
});