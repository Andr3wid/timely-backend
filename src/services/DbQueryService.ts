import { TimesheetEntry } from "../models/TimesheetEntry";
import { sequelize } from "./DbConnectionService";

export class DbQueryService {
    public static getTimesheetByTimespan(from: Date, to: Date): Promise<any> {
        return new Promise((res, rej) => {
            res(`TODO: Implement\nWould've gotten timesheet entries from ${from} to ${to}`);
        });
    }

    public static addTimesheet(entry: TimesheetEntry): Promise<void> {
        return new Promise((res, rej) => {
            if(!TimesheetEntry.validate(entry)) {
                rej(`Invalid timesheet entry. Make sure username, date and type are set to valid values`);
            } else {
                // sequelize.
            }
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