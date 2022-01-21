import { ENETUNREACH } from "constants";
import { TimesheetEntry } from "../models/TimesheetEntry";
import { UserDetails } from "../models/UserDetails";
import { sequelize } from "./DbConnectionService";
import { Op } from "sequelize";

export class DbQueryService {
  public static getTimesheetByTimespan(from: Date, to: Date): Promise<any> {
    return TimesheetEntry.findAll({
      where: {
        timestamp: {
          [Op.between]: [from, to],
        },
      },
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
