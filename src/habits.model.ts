export interface IHabitMeta {
  name: string;
  type: string;
  history: IHabitHistory;
}

export type IHabitLink = { date: string; active: boolean };

export type IHabitHistory = IHabitLink[];
