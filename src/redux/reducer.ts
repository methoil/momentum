import { createStore } from "redux";
import { IHabitMeta, IHabitCollection, IHabitLink } from "../habits.model";
import { cloneDeep } from "lodash";
import { link } from "fs";
import { DateStr, toDateStr } from "../app/services/date-utils";

export type HabitModel = {
  name: string,
  _id: string,
  history: boolean [],
}

export type IState = { ownerId: string; habitHistory: HabitModel [], displayedDates: DateStr [] };

interface IToggleLinkAction {
  type: string;
  payload: {
    id: string,
    index: number,
  };
}

interface ILoadHabitsPayload {
  ownerId: string;
  displayedDates: DateStr [];
  habitHistory: HabitModel[];
}

const defaultState: IState = {
  ownerId: "",
  displayedDates: [],
  habitHistory: [],
};

const TOGGLE_DATE = "TOGGLE_DATE";
const LOAD_DATES = "LOAD_DATES";

export const toggleLinkAction = (payload: IToggleLinkAction['payload']): IToggleLinkAction => ({
  type: TOGGLE_DATE,
  payload,
});

export const loadDatesAction = (payload: ILoadHabitsPayload): any => ({
  type: LOAD_DATES,
  payload: payload,
});



interface IHabitStoreAction {
  type: string;
  payload: any;
}

const reducer = (state: IState = defaultState, action: IHabitStoreAction) => {
  switch (action.type) {
    case TOGGLE_DATE:
      const {id, index} = action.payload;
      const habitIdx = state.habitHistory.findIndex(model => model._id === id);

      if (habitIdx > -1) {
        const newHabit = Object.assign({}, state.habitHistory[habitIdx]);        
        newHabit.history[index] = !newHabit.history[index];
        state.habitHistory[habitIdx] = newHabit;
      }


      return state;
    case LOAD_DATES:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
