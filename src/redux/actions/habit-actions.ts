import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { DateStr } from '../../services/date-utils';
import { IServerHabitData } from '../../habits.model';
import { AppEvents } from '../events';
import { IHabit, IState } from '../reducer';

export const makeAction = <T extends AppEvents, P>(type: T) => (payload: P) => {
  return {
    type,
    payload,
  };
};

interface IToggleLinkPayload {
  id: string;
  index: number;
}

export const ToggleLinkAction = (payload: IToggleLinkPayload) => {
  return {
    type: AppEvents.TOGGLE_DATE,
    payload,
  };
};

interface ILoadHabitsPayload {
  ownerId: string;
  displayedDates: DateStr[];
  habitHistory: IHabit[];
}

interface IHabitOnServer {
  history: string[];
  _id: string;
  name: string;
  owner: string;
}

type IServerResponse = IHabitOnServer[];

// TODO: generate this properly
const bearerToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk3OTkyNTU0ZDYyMzUzNjg5YjVkMGEiLCJpYXQiOjE2MDUxNTIwMDd9.13IGP-iDtchDzCJJW14tJjMDKlUwG-28RG9IYEPK76E';

export function saveDatesToServer(): ThunkAction<
  void,
  IState,
  unknown,
  Action<string>
> {
  return async function (dispatch, getState) {
    const dirtyHabits = getState().habitHistory.filter((habit) => habit.dirty);
    const dates = getState().displayedDates;
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
    } catch (error) {
      console.error('error saving habits', error);
    }
  };
}

export const loadDatesFromServer = (
  displayedDates: DateStr[]
): ThunkAction<void, IState, unknown, Action<string>> => {
  return async function (dispatch, getState) {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits`, {
      headers: { Authorization: getState().user.token },
    });
    const serverData: any = await res.json();
    const habitHistory = transtlateDatesToView(serverData, displayedDates);

    const loadAppPayload = {
      ownerId: getState().user.userId, // TODO: set this properly
      displayedDates,
      habitHistory,
    };
    dispatch(LoadDatesAction(loadAppPayload));
  };
};

const transtlateDatesToView = (
  mockData: IServerHabitData[],
  displayedDates: DateStr[]
): IHabit[] => {
  return mockData.map((habit) => {
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

export const LoadDatesAction = makeAction<
  AppEvents.LOAD_DATES,
  ILoadHabitsPayload
>(AppEvents.LOAD_DATES);

interface IStringMap<T> {
  [key: string]: T;
}

type IAnyFunction = (...args: any[]) => any;

type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

const actions = {
  LoadDatesAction,
  ToggleLinkAction,
};

export type IAction = IActionUnion<typeof actions>;
