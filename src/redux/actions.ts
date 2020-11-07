import { DateStr } from "../app/services/date-utils";
import { AppEvents } from "./events";
import { HabitModel } from "./reducer";

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

export const ToggleLinkAction = makeAction<
  AppEvents.TOGGLE_DATE,
  IToggleLinkPayload
>(AppEvents.TOGGLE_DATE);

interface ILoadHabitsPayload {
  ownerId: string;
  displayedDates: DateStr[];
  habitHistory: HabitModel[];
}

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
};

export type IAction = IActionUnion<typeof actions>;
