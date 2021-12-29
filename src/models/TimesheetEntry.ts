import { DataTypes, Model } from "sequelize";
import { sequelize } from "../services/DbConnectionService";

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
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrementIdentity: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
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
