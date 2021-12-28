export enum EntryType {
    CLOCK_IN,
    CLOCK_OUT,
};

export class TimesheetEntry {

    username: string;
    time: Date;
    type: EntryType;

}