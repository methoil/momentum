import { IHabitMeta } from "../habits.model";
import { IHabit } from "../redux/reducer";

export function generateDisplayedDates(daysBack: number): DateStr[] {
  const labels: DateStr[] = [];
  const date = new Date();
  for (let i = 0; i < daysBack; i++) {
    labels.push(toDateStr(date));
    date.setDate(date.getDate() - 1);
  }
  return labels;
}

export function toDateStr(date: Date | string): DateStr {
  if (typeof date === 'string') {
    if (checkValidDateStr(date)) return date;
    else throw new Error(`Invalid date string : ${date}`);
  } else {
    // TODO: probably want to include the day here
    // const dateString = date.toDateString();
    const dateString = date.toISOString().split('T')[0];
    if (checkValidDateStr(dateString)) return dateString;
  }
  throw new Error(`Invalid date string : ${date}`);
}

function checkValidDateStr(str: string): str is DateStr {
  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
}

enum DateStrBrand {}

export type DateStr = string & DateStrBrand;

export const transtlateDatesToView = (
  storedData: Array<IHabitMeta>,
  displayedDates: DateStr[]
): IHabit[] => {
  return storedData.map((habit) => {
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
