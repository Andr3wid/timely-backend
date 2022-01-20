import { ENETUNREACH } from "constants";
import { TimesheetEntry } from "../models/TimesheetEntry";
import { UserDetails } from "../models/UserDetails";
import { sequelize } from "./DbConnectionService";

export class DbQueryService {
  public static getTimesheetByTimespan(from: Date, to: Date): Promise<any> {
    return new Promise((res, rej) => {
      res(
        `TODO: Implement\nWould've gotten timesheet entries from ${from} to ${to}`
      );
    });
  }

  public static addTimesheet(entry: TimesheetEntry): Promise<TimesheetEntry> {
    if (!TimesheetEntry.validate(entry)) {
      Promise.reject(
        `Invalid timesheet entry. Make sure username, date and type are set to valid values`
      );
    } else {
      return TimesheetEntry.build(entry).save();
    }
  }

  public static getUserDetails(username: string): Promise<UserDetails> {
    return new Promise((res, rej) => {
      res({} as UserDetails);
    });
  }
}
