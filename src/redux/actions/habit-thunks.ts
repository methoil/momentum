import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { CreateHabitAction, RemoveHabitAction, LoadDatesAction } from './habit-actions';
import { IHabit, IState } from '../reducer';
import { DateStr } from '../../services/date-utils';
import { createHabitOnServer, loadHabitsFromServer, removeHabitFromServer, saveHabitsToServer } from './habit-server-requests';
import { createLocalHabit, loadLocalHabits, removeLocalHabit, updateLocalHabits } from './habit-local-storage';


export const createHabit = (
  habitName: string
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    let _id: string;

    if (getState().user.loggedIn) {
      _id = await createHabitOnServer(habitName, getState().user.token);
    } else {
      _id  = createLocalHabit(habitName, getState().habitHistory);
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
      removeLocalHabit(_id, getState().habitHistory)
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
      updateLocalHabits(dirtyHabits, dates);
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
      habitHistory = loadLocalHabits(displayedDates);      
    }
    const loadAppPayload = {
      ownerId: getState().user.userId, // TODO: set this properly
      displayedDates,
      habitHistory,
    };
    dispatch(LoadDatesAction(loadAppPayload));
  };
};

