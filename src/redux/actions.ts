import { DateStr } from "../app/services/date-utils";
import { IServerHabitData } from "../habits.model";
import { AppEvents } from "./events";
import { HabitModel } from "./reducer";

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

export const loadDatesFromServer = (displayedDates: DateStr[]) => {
  // TODO: generate this properly
  const bearerToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllMTc3ODIzM2Y1NTU4YzgxMTg5MDYiLCJpYXQiOjE2MDQxOTYyMTd9.4TNDCHjTOkEGMeAIHZbx68EcSa4muqxW1M3wcPY_PTY";

  return async function (dispatch) {
    const serverData = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/habits`,
      {
        headers: { Authorization: bearerToken },
      }
    );

    const storeData = transtlateDatesToView(serverData, displayedDates);

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
