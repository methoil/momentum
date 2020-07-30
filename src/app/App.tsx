import React, { useEffect } from "react";
import "./App.css";
import { HabitChain } from "../components/habit-chain";
import habits from "../mock-data.json";
import { useDispatch, useSelector } from "react-redux";
import { IHabitCollection, IHabitMeta } from "../habits.model";
import { IState, loadDatesAction } from "../redux/reducer";
import { TitleBar } from "../components/dates-title-bar";

function App() {
  const timePeriods: JSX.Element[] = [];

  // This is what gets passed into generateDisplayedDates
  // TODO: keep them connected - this is confusing AF as is
  const dates = habits[0].dates.map((date, idx) => new Date(2020, 6, idx + 1));
  const mockData = generateMockData(dates);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDatesAction(mockData));
  }, []);

  const habitMeta = useSelector((state: IState) => state.habitHistory);

  // TODO: this will probably need to be an array to preserve the order
  Object.entries(habitMeta).map((meta) => {
    const chainComp = (
      <HabitChain habitMeta={meta[1]} key={Math.random()}></HabitChain>
    );
    timePeriods.push(chainComp);
  });

  return (
    <div className="App">
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">
        <TitleBar dates={generateDisplayedDates(dates)}></TitleBar>
        {timePeriods}
      </div>
    </div>
  );
}

function generateDisplayedDates(dates: Date[]): string[] {
  const MAX_HISTORY = 30;
  const today = new Date().toDateString();
  // We can expect the date info to come it sorted - as I will be passing it in
  // we could even sort it here but it's not an efficient place to do it, eso with larger data
  const dateStrings: string[] = [];
  var date = new Date();
  let historyCount = 0;
  let totalCount = 0;

  while (historyCount < dates.length && totalCount < MAX_HISTORY) {
    const currDateStr = date.toDateString();
    if (dates[historyCount].toDateString() === currDateStr) {
      historyCount++;
    }
    dateStrings.push(currDateStr);
    date.setDate(date.getDate() - 1);
    totalCount++;
  }

  return dateStrings;
}

function generateMockData(dates: Date[]) {
  const habitMeta: IHabitCollection = {};
  for (let habit of habits) {
    const history = new Array(10)
      .fill(null)
      .map((entry, idx) => ({
        date: dates[idx],
        active: Math.random() * 2 > 1,
      }));

    habitMeta[habit.name] = {
      history,
      name: habit.name,
      type: habit.type,
    };
  }
  return habitMeta;
}

export default App;
