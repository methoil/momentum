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
  ownerId: string;
  habitHistory: HabitModel[];
  displayedDates: DateStr[];
};

const defaultState: IState = {
  ownerId: "",
  displayedDates: [],
  habitHistory: [],
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
    default:
      return state;
  }
};
