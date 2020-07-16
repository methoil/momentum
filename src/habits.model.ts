export interface IHabitCollection {
  [key: string]: IHabitMeta;
}

export interface IHabitMeta {
  name: string;
  type: string;
  history: IHabitHistory;
}

export type IHabitHistory = IHabitLink[];

// TODO: will need to represent date otherwise
export type IHabitLink = { date: number; active: boolean };
