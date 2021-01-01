import { DateStr } from "./services/date-utils";

export interface IHabitCollection {
  [key: string]: IHabitMeta;
}

export interface IHabitMeta {
  name: string;
  _id: string;
  history: IDateHistory;
  type?: string;
}

export type IDateHistory = DateStr[];

// TODO: will need to represent date otherwise
export type IHabitLink = { date: DateStr; active: boolean };
