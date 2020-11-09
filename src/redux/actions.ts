import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { DateStr } from "../app/services/date-utils";
import { IServerHabitData } from "../habits.model";
import { AppEvents } from "./events";
import { HabitModel, IState } from "./reducer";

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

export const ToggleLinkAction = makeAction<
  AppEvents.TOGGLE_DATE,
  IToggleLinkPayload
>(AppEvents.TOGGLE_DATE);

interface ILoadHabitsPayload {
  ownerId: string;
  displayedDates: DateStr[];
  habitHistory: HabitModel[];
}

interface IHabitOnServer {
  history: string[];
  _id: string;
  name: string;
  owner: string;
}

type IServerResponse = IHabitOnServer[];

export const loadDatesFromServer = (
  displayedDates: DateStr[]
): ThunkAction<void, IState, unknown, Action<string>> => {
  // TODO: generate this properly
  const bearerToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk3OTkyNTU0ZDYyMzUzNjg5YjVkMGEiLCJpYXQiOjE2MDQ4OTU4ODd9.iwCsbLn1fOvGRqLF0m2EVOpWWs_89G2uWa3GFlVwQuc";

  return async function (dispatch) {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits`, {
      headers: { Authorization: bearerToken },
    });
    const serverData: any = await res.json();
    const habitHistory = transtlateDatesToView(serverData, displayedDates);

    const loadAppPayload = {
      ownerId: "5f97992554d62353689b5d0a",
      displayedDates,
      habitHistory,
    };
    dispatch(LoadDatesAction(loadAppPayload));
  };
};

const transtlateDatesToView = (
  mockData: IServerHabitData[],
  displayedDates: DateStr[]
): HabitModel[] => {
  return mockData.map((habit) => {
    const { name, _id } = habit;
    const history = habit.history[0].split(",").reverse();

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
    return { name, _id, history: combined };
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
