import { Sequelize } from "sequelize";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../services/DbConnectionService";
import { UserDetails } from "./UserDetails";

export enum EntryType {
  CLOCK_IN = "clockin",
  CLOCK_OUT = "clockout",
}

export class TimesheetEntry extends Model {
  username: string;
  date: Date;
  type: EntryType;

  public static validate(entry: TimesheetEntry): boolean {
    return (
      entry.username !== undefined &&
      entry.date !== undefined &&
      entry.type !== undefined
    );
  }
}

TimesheetEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TimesheetEntry",
  }
);
