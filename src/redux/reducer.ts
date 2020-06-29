import { createStore } from 'redux';
import { IHabitMeta } from '../habits.model';
import { cloneDeep } from 'lodash';

type IState = { habitHistory: { [key: string]: IHabitMeta } };

interface ITodoAction {
  type: string;
  id: string;
  name: string;
  payload: boolean;
}

export const toggleLinkAction = (id: string, name: string, payload: boolean): ITodoAction => ({
  type: 'TOGGLE_DATE',
  id,
  name,
  payload,
});

const defaultState = {
  habitHistory: {},
};

const reducer = (state: IState = defaultState, action: ITodoAction) => {
  const stateCopy = cloneDeep(state);
  switch (action.type) {
    case 'TOGGLE_DATE':
      stateCopy.habitHistory[action.name].history[action.id] = action.payload;
      return stateCopy;
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
