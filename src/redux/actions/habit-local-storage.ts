import { v4 } from "uuid";
import { IHabitMeta } from "../../habits.model";
import { DateStr, transtlateDatesToView } from "../../services/date-utils";
import { IHabit } from "../reducer";

const LOCAL_STORAGE_PREFIX = 'MOMENTUM_HABIT_DATA_';
const LOCAL_STORAGE_HABIT_IDS = 'MOMENTUM_HABIT_IDS';

export function loadLocalHabits(displayedDates: DateStr[]): IHabit[] {
  const habitIds: string[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HABIT_IDS) || '[]');
  if (Array.isArray(habitIds)) {
    const storedData: IHabitMeta[] = [];
    habitIds?.forEach(id => {
      const storedHabitMeta = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${id}`);
      if (storedHabitMeta) {
        storedData.push(JSON.parse(storedHabitMeta));
      }
    });
    return transtlateDatesToView(storedData, displayedDates);
  } else {
    console.error('Invalid data is present in local storage for habit ids');
    return [];
  }
}

export function createLocalHabit(habitName: string, habitHistory: IHabit[]): string {
  const _id = v4()
  const habitMeta = {
    name: habitName,
    history: [],
    _id,
  }
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${_id}`, JSON.stringify(habitMeta));
  const habitIds: string[] = habitHistory.map(habit => habit._id);
  habitIds.push(_id);
  localStorage.setItem(`${LOCAL_STORAGE_HABIT_IDS}`, JSON.stringify(habitIds));
  return _id;
}

export function updateLocalHabits(dirtyHabits: IHabit[], dates: DateStr[]) {
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

export function removeLocalHabit(_id: string, habitHistory: IHabit[]): void {
  localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${_id}`);
  const newHabitIds = habitHistory
    .filter(habit => habit._id !== _id)
    .map(habit => habit._id);
  localStorage.setItem(LOCAL_STORAGE_HABIT_IDS, JSON.stringify(newHabitIds));
}