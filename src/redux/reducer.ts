import { createStore } from 'redux';
import { IHabitMeta, IHabitCollection, IHabitLink } from '../habits.model';
import { cloneDeep } from 'lodash';
import { link } from 'fs';
import { toDateStr } from '../app/services/date-utils';

export type IState = { ownerId: string, habitHistory: IHabitCollection };

interface ITodoAction {
  type: string;
  name: string;
  payload: IHabitLink;
}

interface ILoadHabitsPayload {
  ownerId: string;
  history: IHabitMeta[];
}

const TOGGLE_DATE = 'TOGGLE_DATE';
const LOAD_DATES = 'LOAD_DATES';

export const toggleLinkAction = (name: string, payload: IHabitLink): ITodoAction => ({
  type: TOGGLE_DATE,
  name,
  payload,
});

export const loadDatesAction = (payload: ILoadHabitsPayload): any => ({
  type: LOAD_DATES,
  payload: payload,
});

const defaultState: IState = {
  ownerId: '',
  habitHistory: {},
};

const reducer = (state: IState = defaultState, action: ITodoAction) => {
  switch (action.type) {
    case TOGGLE_DATE:
      const history = state.habitHistory[action.name].history;
      const idx = history.findIndex((link) => toDateStr(link.date) === toDateStr(action.payload.date));
      history[idx].active = action.payload.active;
      return state;
    case LOAD_DATES:
      return Object.assign(state, { habitHistory: action.payload });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
