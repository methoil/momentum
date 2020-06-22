import { createStore } from "Redux";
import { IHabitMeta } from "./habits.model";

type IState = { [key: string]: IHabitMeta };

interface IAction {
  type: string;
  habitName: string;
  date: number; // access index of array for now
  payload: boolean;
}

const actionHandler = (state: IState = {}, action: IAction) => {
  switch (action.type) {
    case "TOGGLE_DATE":
      state[action.habitName].history[action.date] = action.payload;
      return state;
    default:
      return state;
  }
};

const store = createStore(actionHandler);

export default store;
