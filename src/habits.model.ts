export interface IHabitMeta {
  name: string;
  type: string;
  history: IHabitHistory;
}

export type IHabitHistory = boolean[];
