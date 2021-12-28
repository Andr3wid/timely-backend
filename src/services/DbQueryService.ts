import { TimesheetEntry } from "../models/TimesheetEntry";
import { Model, Sequelize } from "sequelize";
import { logger } from "./LoggingService";

const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_SECRET,
    database: process.env.DB_NAME,
});

sequelize.authenticate()
    .then(() => {
        logger.info('DB connection successful!');
    })
    .catch(err => {
        logger.error(`Error while connecting to database:\n${err}`)
    });

export class DbQueryService {
    public static getTimesheetByTimespan(from: Date, to: Date): Promise<any> {
        return new Promise((res, rej) => {
            res(`TODO: Implement\nWould've gotten timesheet entries from ${from} to ${to}`);
        });
    }

    public static addTimesheet(entry: TimesheetEntry): Promise<void> {
        return new Promise((res, rej) => {
            res();
        });
    }

    public static getUserDetails(username: string): Promise<Object> {
        return new Promise((res, rej) => {
            res({
                username: username,
                lastLogin: new Date(0),
                timesheetEntries: -1,
            });
        });
    }
}