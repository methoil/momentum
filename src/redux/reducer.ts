import { DateStr } from '../services/date-utils';
import { IAction } from './actions/habit-actions';
import { SetUserInfoAction } from './actions/user-actions';
import { AppEvents } from './events';

export interface IHabit {
  _id: string;
  name: string;
  history: boolean[];
  dirty: boolean;
}

export interface IUser {
  userId: string;
  email: string;
  username: string;
  token: string;
  loggedIn: boolean;
}

export type IState = {
  habitHistory: IHabit[];
  displayedDates: DateStr[];
  user: IUser;
};

const defaultState: IState = {
  displayedDates: [],
  habitHistory: [],
  user: {
    userId: '',
    email: '',
    username: '',
    token: '',
    loggedIn: false,
  },
};

export const reducer = (
  state: IState = defaultState,
  action: IAction | any
) => {
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
      state.user = action.payload;
      return state;

    default:
      return state;
  }
};
