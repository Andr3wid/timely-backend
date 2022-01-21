import express from "express";
import { logger } from "./services/LoggingService";
import { DbQueryService } from "./services/DbQueryService";
import { TimesheetEntry } from "./models/TimesheetEntry";
import { UserDetails } from "./models/UserDetails";

const port = 3030;
const authToken = process.env.AUTH_TOKEN;
export const app = express();

/*
    === MIDDLEWARE ===
*/
app.use((req, res, next) => {
  logger.info(`request on ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if (req.headers.authorization === authToken) {
    next();
  } else {
    res.status(403).send("Invalid auth token");
  }
});

app.use(express.json());

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

app.post("/timesheet/entry", (req, res) => {
  DbQueryService.addTimesheet({
    username: req.body.username,
    date: new Date(), // TODO: if requests queue up, this timestamp does not reflect the actual user-submitted time
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
