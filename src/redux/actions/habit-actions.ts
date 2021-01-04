import { DateStr } from '../../services/date-utils';

import { AppEvents } from '../events';
import { IHabit, IState } from '../reducer';

export const makeAction = <T extends AppEvents, P>(type: T) => (payload: P) => {
  return {
    type,
    payload,
  };
};

interface IToggleLinkPayload {
  id: string;
  index: number;
}

interface ICrateHabitPayload {
  name: string;
  history: boolean[];
  _id: string;
  dirty: boolean;
}

interface IRemoveHabitPayload {
  _id: string;
}

export const ToggleLinkAction = (payload: IToggleLinkPayload) => {
  return {
    type: AppEvents.TOGGLE_DATE,
    payload,
  };
};

export const CreateHabitAction = (payload: ICrateHabitPayload) => {
  return {
    type: AppEvents.CREATE_HABIT,
    payload,
  };
};

export const RemoveHabitAction = (payload: IRemoveHabitPayload) => {
  return {
    type: AppEvents.REMOVE_HABIT,
    payload,
  }
}



interface ILoadHabitsPayload {
  ownerId: string;
  displayedDates: DateStr[];
  habitHistory: IHabit[];
}

// interface IHabitOnServer {
//   history: string[];
//   _id: string;
//   name: string;
//   owner: string;
// }

// type IServerResponse = IHabitOnServer[];



export const LoadDatesAction = makeAction<
  AppEvents.LOAD_DATES,
  ILoadHabitsPayload
>(AppEvents.LOAD_DATES);

interface IStringMap<T> {
  [key: string]: T;
}

type IAnyFunction = (...args: any[]) => any;

type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

const actions = {
  LoadDatesAction,
  ToggleLinkAction,
  CreateHabitAction,
};

export type IAction = IActionUnion<typeof actions>;
