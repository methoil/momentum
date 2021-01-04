import { IHabitMeta } from "../../habits.model";
import { DateStr, transtlateDatesToView } from "../../services/date-utils";
import { IHabit } from "../reducer";

interface IServerHabitRes {
  createdAt: string;
  history: DateStr[];
  name: string;
  owner: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface INewHabitMeta {
  name: string;
  history: DateStr[];
}

export async function createHabitOnServer(habitName: string, userToken: string): Promise<string> {
  const habitMeta: INewHabitMeta = {
    name: habitName,
    history: [],
  };
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits`, {
    method: 'POST',
    headers: {
      Authorization: userToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habitMeta),
  });
  const serverData: IServerHabitRes = await res.json();
  return serverData._id;
}

export async function saveHabitsToServer(dirtyHabits: IHabit[], dates: DateStr[], userToken: string): Promise<void> {
  const requests = dirtyHabits.map((habit) => {
    const history: DateStr[] = dates.filter((date, i) => habit.history[i]);
    fetch(`${process.env.REACT_APP_SERVER_URL}/habits/${habit._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history }),
    });
  });

  await Promise.all(requests);
}

export async function loadHabitsFromServer(displayedDates: DateStr[], userToken: string): Promise<IHabit[]> {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits`, {
    headers: { Authorization: userToken },
  });
  const serverData: IServerHabitRes[] = await res.json();
  return transtlateDatesToView(serverData, displayedDates);
}

export async function removeHabitFromServer(_id: string, userToken: string): Promise<void> {
  await fetch(`${process.env.REACT_APP_SERVER_URL}/habits/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: userToken,
      'Content-Type': 'application/json',
    },
  });
}