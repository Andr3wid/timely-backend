import express from "express";
import { logger } from "./services/LoggingService";
import { DbQueryService } from "./services/DbQueryService";
import { TimesheetEntry } from "./models/TimesheetEntry";

const port = 3030;
export const app = express();

/*
    === MIDDLEWARE ===
*/
app.use((req, res, next) => {
  logger.info(`request on ${req.url}`);
  next();
});

/*
    === ROUTES ===
*/
app.get("/", (req, res) => {
  res.send("Timely backend service says hello! :)");
});

app.get("/user/:username", (req, res) => {
  DbQueryService.getUserDetails(req.params.username)
    .then((userDetails) => res.send(JSON.stringify(userDetails)))
    .catch((err) => {
      logger.error(`Error in route /user/${req.params.username}: \n${err}`);
      res.status(500).send(JSON.stringify(err));
    });
});

/**
 * expects query params 'from' and 'to' containing ISO8601 timestamps
 */
app.get("/timesheet/:username", (req, res) => {
  if (req.params.username === undefined) {
    res.send(
      `Expected format: '/timesheet/USERNAME?from=YYYY-MM-dd' query parameters optional`
    );
    return;
  }

  const fromDate =
    req.query.from === undefined
      ? new Date(0)
      : new Date(req.query.from as string);
  const toDate =
    req.query.to === undefined ? new Date() : new Date(req.query.to as string);

  DbQueryService.getTimesheetByTimespan(fromDate, toDate)
    .then((timeSheet) => res.send(timeSheet))
    .catch((err) => {
      logger.error(
        `Error in route /timesheet/${req.params.username}: \n${err}`
      );
      res.status(500).send(JSON.stringify(err));
    });
});

app.post("/timesheet/:username", (req, res) => {
  DbQueryService.addTimesheet({
    username: req.body.username,
    date: new Date(req.body.date),
    type: req.body.type,
  } as TimesheetEntry)
    .then(() => res.send("Entry added successfully"))
    .catch((err) => {
      logger.info(`Error while adding timesheet entry:\n${err}`);
      res.status(500).send(`Could not add timesheet entry:\n${err}`);
    });
});

app.listen(port, () => {
  logger.info(`Timely backend listening on port ${port}`);
});
