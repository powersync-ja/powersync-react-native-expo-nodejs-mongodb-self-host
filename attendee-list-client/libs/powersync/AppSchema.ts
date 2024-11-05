import { column, Schema, Table } from '@powersync/react-native';

const attendee = new Table({
    first_name: column.text,
    last_name: column.text,
    email: column.text,
    checked_in: column.integer
});

const event = new Table({
    name: column.text,
    date: column.text
});

export const AppSchema = new Schema({
    attendee,
    event,
});

export type Database = (typeof AppSchema)['types'];
export type AttendeeRecord = Database['attendee'];
export type EventRecord = Database['event'];
