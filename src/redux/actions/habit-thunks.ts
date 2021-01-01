import { ThunkAction } from 'redux-thunk';
import { IHabitMeta } from '../../habits.model';
import { Action } from 'redux';
import { ToggleLinkAction, CreateHabitAction, RemoveHabitAction, LoadDatesAction } from './habit-actions';
import { IHabit, IState } from '../reducer';
import { DateStr, transtlateDatesToView } from '../../services/date-utils';
import { v4 } from 'uuid';
import { createHabitOnServer, loadHabitsFromServer, removeHabitFromServer, saveHabitsToServer } from './habit-server-requests';
const LOCAL_STORAGE_PREFIX = 'MOMENTUM_HABIT_DATA_';
const LOCAL_STORAGE_HABIT_IDS = 'MOMENTUM_HABIT_IDS';

export const createHabit = (
  habitName: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    let _id: string;

    if (getState().user.loggedIn) {
      _id = await createHabitOnServer(habitName, getState().user.token);
    } else {
      _id = v4()
      const habitMeta = {
        name: habitName,
        history: [],
        _id,
      }
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

export const removeHabit = (_id: string): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    if (getState().user.loggedIn) {
      await removeHabitFromServer(_id, getState().user.token);
    } else {
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${_id}`);
      const newHabitIds = getState().habitHistory
        .filter(habit => habit._id !== _id)
        .map(habit => habit._id);
      localStorage.setItem(LOCAL_STORAGE_HABIT_IDS, JSON.stringify(newHabitIds));
    }
    dispatch(RemoveHabitAction({ _id }));
  }
};

export function updateHabits(): ThunkAction<
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
        await saveHabitsToServer(dirtyHabits, dates, getState().user.token);
      }
      catch (error) {
        console.error('error saving habits', error);
      }
    } else {
      dirtyHabits.forEach((habit) => {
        const history: DateStr[] = dates.filter((date, i) => habit.history[i]);
        const storedData: IHabitMeta = {
          name: habit.name,
          _id: habit._id,
          history,
        }
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${habit._id}`, JSON.stringify(storedData));
      });
    }
  };
}

export const loadHabits = (
  displayedDates: DateStr[]
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    let habitHistory: IHabit[] = [];
    if (getState().user.loggedIn) {
      habitHistory = await loadHabitsFromServer(displayedDates, getState().user.token)
    }
    else {
      const habitIds: string[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HABIT_IDS) || '[]');
      if (Array.isArray(habitIds)) {
        const storedData: IHabitMeta[] = [];
        habitIds?.forEach(id => {
          const storedHabitMeta = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`);
          if (storedHabitMeta) {
            storedData.push(JSON.parse(storedHabitMeta));
          }
        });
        habitHistory = transtlateDatesToView(storedData, displayedDates);
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

