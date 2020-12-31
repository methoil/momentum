import { ThunkAction } from 'redux-thunk';
import {  IServerHabitData } from '../../habits.model';
import { Action } from 'redux';
import { ToggleLinkAction, CreateHabitAction, RemoveHabitAction, LoadDatesAction } from './habit-actions';
import { IHabit, IState } from '../reducer';
import { DateStr } from '../../services/date-utils';
import { v4 } from 'uuid';
const LOCAL_STORAGE_PREFIX = 'MOMENTUM_HABIT_DATA_';
const LOCAL_STORAGE_HABIT_IDS = 'MOMENTUM_HABIT_IDS';

interface INewHabitMeta {
  name: string;
  history: DateStr[];
  _id?: string;
}

export const createHabitRequest = (
  habitName: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    let _id: string;
    const habitMeta: INewHabitMeta = {
      name: habitName,
      history: [],
    };
    if (getState().user.loggedIn) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits`, {
        method: 'POST',
        headers: {
          Authorization: getState().user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitMeta),
      });
      const serverData: any = await res.json();
      _id = serverData._id;
    } else {
      _id = v4();
      habitMeta._id = _id;
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${_id}`, JSON.stringify(habitMeta));
      const habitIds: string[] = getState().habitHistory.map(habit => habit._id);
      habitIds.push(_id);
      localStorage.setItem(`${LOCAL_STORAGE_HABIT_IDS}`, JSON.stringify(habitIds));
    }

    const createHabitPayload = {
      name: habitName,
      history: new Array(getState().displayedDates.length).fill(false),
      _id,
      dirty: false,
    };
    dispatch(CreateHabitAction(createHabitPayload));
  };
};

export const removeHabitRequest = (_id: string): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    if (getState().user.loggedIn) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: getState().user.token,
          'Content-Type': 'application/json',
        },
      });
    } else {
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${_id}`);
    }
    dispatch(RemoveHabitAction({ _id }));
  }
};

export function saveDatesToServer(): ThunkAction<
  void,
  IState,
  unknown,
  Action<string>
> {
  return async function (dispatch, getState) {
    const dirtyHabits = getState().habitHistory.filter((habit) => habit.dirty);
    const dates = getState().displayedDates;
    if (getState().user.loggedIn) {
      try {
        const requests = dirtyHabits.map((habit) => {
          const history = dates.filter((date, i) => habit.history[i]);
          fetch(`${process.env.REACT_APP_SERVER_URL}/habits/${habit._id}`, {
            method: 'PATCH',
            headers: {
              Authorization: getState().user.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ history }),
          });
        });

        await Promise.all(requests);
      }
      catch (error) {
        console.error('error saving habits', error);
      }
    } else {
      dirtyHabits.forEach((habit) => {
        const history = dates.filter((date, i) => habit.history[i]);
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${habit._id}`, JSON.stringify({ history }));
      });
    }
  };
}

export const loadDatesFromServer = (
  displayedDates: DateStr[]
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    let habitHistory: IHabit[] = [];
    if (getState().user.loggedIn) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits`, {
        headers: { Authorization: getState().user.token },
      });
      const serverData: any = await res.json();
      habitHistory = transtlateDatesToView(serverData, displayedDates);
    }
    else {
      const habitIds: string[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HABIT_IDS) || '[]');
      if (Array.isArray(habitIds)) {
        habitIds?.forEach(id => {
          habitHistory.push(JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`) || '[]'));
        });
      } else {
        console.error('Invalid data is present in local storage for habit ids');
      }
    }
    const loadAppPayload = {
      ownerId: getState().user.userId, // TODO: set this properly
      displayedDates,
      habitHistory,
    };
    dispatch(LoadDatesAction(loadAppPayload));
  };
};

const transtlateDatesToView = (
  serverData: IServerHabitData[],
  displayedDates: DateStr[]
): IHabit[] => {
  return serverData.map((habit) => {
    const { name, _id } = habit;
    const history = habit.history;

    let habitDateIdx = 0;
    const combined = new Array(displayedDates.length);
    for (let i = 0; i < displayedDates.length; i++) {
      if (displayedDates[i] === history[habitDateIdx]) {
        combined[i] = true;
        habitDateIdx++;
      } else {
        combined[i] = false;
      }
    }
    return { name, _id, history: combined, dirty: false };
  });
};