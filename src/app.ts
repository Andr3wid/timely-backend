import express, { application } from 'express';
import { logger } from './services/LoggingService';

const PORT = 3030;
export const APP = express();

APP.get('/', (req, res) => {
    res.send('Timely backend service says hello! :)');
});

APP.listen(PORT, () => {
    logger.info(`Timely backend listening on port ${PORT}`);
});
