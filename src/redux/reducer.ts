import { DateStr } from "../services/date-utils";
import { IAction } from "./actions/habit-actions";
import { AppEvents } from "./events";

export type HabitModel = {
  name: string;
  _id: string;
  history: boolean[];
  dirty: boolean;
};

export type IState = {
  habitHistory: HabitModel[];
  displayedDates: DateStr[];
  user: {
    userId: string;
    email: string;
    username: string;
    token: string;
  };
};

const defaultState: IState = {
  displayedDates: [],
  habitHistory: [],
  user: {
    userId: "",
    email: "",
    username: "",
    token: "",
  },
};

export const reducer = (state: IState = defaultState, action: IAction) => {
  switch (action.type) {
    case AppEvents.LOAD_DATES:
      return Object.assign(state, action.payload);
    case AppEvents.TOGGLE_DATE:
      const { id, index } = action.payload;
      const habitIdx = state.habitHistory.findIndex(
        (model) => model._id === id
      );

      if (habitIdx > -1) {
        const newHabit = Object.assign({}, state.habitHistory[habitIdx]);
        newHabit.history[index] = !newHabit.history[index];
        newHabit.dirty = true;
        state.habitHistory[habitIdx] = newHabit;
      }

      return state;

    case AppEvents.SET_USER_INFO:
      Object.assign(state.user, action.payload);
      return state;

    default:
      return state;
  }
};
