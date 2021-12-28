import express, { application } from 'express';
import { logger } from './services/LoggingService';
import { DbQueryService } from './services/DbQueryService';

const port = 3030;
export const app = express();

app.use((req, res, next) => {
    logger.info(`Incoming request on ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Timely backend service says hello! :)');
});

app.get('/user/:username', (req, res) => {
    DbQueryService.getUserDetails(req.params.username)
        .then(userDetails => res.send(JSON.stringify(userDetails)))
        .catch(err => {
            logger.error(`Error in route /user/${req.params.username}: \n${err}`);
        });
});

/**
 * expects query params 'from' and 'to' containing ISO8601 timestamps
 */
app.get('/timesheet/:username', (req, res) => {
    if(req.params.username === undefined) {
        res.send(`Expected format: '/timesheet/USERNAME?from=YYYY-MM-dd' query parameters optional`);
        return;
    }

    const fromDate = req.query.from === undefined ? new Date(0) : new Date(req.query.from as string);
    const toDate = req.query.to === undefined ? new Date() : new Date(req.query.to as string);

    DbQueryService.getTimesheetByTimespan(fromDate, toDate)
        .then(timeSheet => res.send(timeSheet))
        .catch(err => {
            logger.error(`Error in route /timesheet/${req.params.username}: \n${err}`);
        });
});

app.post('/timesheet/:username', (req, res) => {

});

app.listen(port, () => {
    logger.info(`Timely backend listening on port ${port}`);
});
