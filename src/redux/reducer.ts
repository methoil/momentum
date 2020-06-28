import { createStore } from "Redux";
import { IHabitMeta } from "../habits.model";
import { cloneDeep } from "lodash";

type IState = { habitHistory: { [key: string]: IHabitMeta } };

interface IAction {
  type: string;
  id: number;
  habitName: string;
  date: number; // access index of array for now
  payload: boolean;
}

const defaultState = {
  habitHistory: {},
};

const reducer = (state: IState = defaultState, action: IAction) => {
  const sCopy = cloneDeep(state);
  switch (action.type) {
    case "TOGGLE_DATE":
      sCopy.habitHistory[action.habitName].history[action.id] = action.payload;
      return sCopy;
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
