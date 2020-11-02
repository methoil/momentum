import { createStore } from 'redux';
import { IHabitMeta, IHabitCollection, IHabitLink } from '../habits.model';
import { cloneDeep } from 'lodash';
import { link } from 'fs';

export type IState = { habitHistory: IHabitCollection };

interface ITodoAction {
  type: string;
  name: string;
  payload: IHabitLink;
}

const TOGGLE_DATE = 'TOGGLE_DATE';
const LOAD_DATES = 'LOAD_DATES';

export const toggleLinkAction = (name: string, payload: IHabitLink): ITodoAction => ({
  type: TOGGLE_DATE,
  name,
  payload,
});

export const loadDatesAction = (payload: IHabitCollection): any => ({
  type: LOAD_DATES,
  payload: payload,
});

const defaultState: IState = {
  habitHistory: {},
};

const reducer = (state: IState = defaultState, action: ITodoAction) => {
  const stateCopy = cloneDeep(state);
  switch (action.type) {
    case TOGGLE_DATE:
      const history = stateCopy.habitHistory[action.name].history;
      const idx = history.findIndex((link) => link.date.toDateString() === action.payload.date.toDateString());
      history[idx].active = action.payload.active;
      return stateCopy;
    case LOAD_DATES:
      return Object.assign(stateCopy, { habitHistory: action.payload });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
