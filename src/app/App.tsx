import React, { useEffect } from "react";
import "./App.css";
import { HabitChain } from "../components/habit-chain";
import mockData from "../mock-data.json";
import { useDispatch, useSelector } from "react-redux";
import { IDateHistory, IHabitCollection, IHabitMeta } from "../habits.model";
import { IState, loadDatesAction } from "../redux/reducer";
import { TitleBar } from "../components/dates-title-bar";
import { toDateStr } from "./services/date-utils";

async function App() {
  const timePeriods: JSX.Element[] = [];

  // TODO: login here
  // const bearerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllMTc3ODIzM2Y1NTU4YzgxMTg5MDYiLCJpYXQiOjE2MDQxOTYyMTd9.4TNDCHjTOkEGMeAIHZbx68EcSa4muqxW1M3wcPY_PTY';

  // const habitData = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits` || '',  {
  //   headers: {Authorization: bearerToken},
  // });

  const habitHistory: IHabitMeta[] = mockData.map((habit) => {
    const {name, history, _id} = habit;
    const dates: IDateHistory = history[0].split(',').map(date => toDateStr(date));
    return { name, _id, history: dates };
  });

  const loadAppPayload = {
    ownerId: mockData?.[0]?.owner || '',
    history: habitHistory,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDatesAction(loadAppPayload));
  }, []);

  const habitMeta = useSelector((state: IState) => state.habitHistory);
  const dateLabels = generateDisplayedDates(dates);

  // TODO: this will probably need to be an array to preserve the order
  Object.entries(habitMeta).map((meta) => {
    const chainComp = (
      <HabitChain
        habitMeta={meta[1]}
        dateLabels={dateLabels}
        key={Math.random()}
      ></HabitChain>
    );
    timePeriods.push(chainComp);
  });

  return (
    <div className="App">
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">
        <TitleBar dates={dateLabels}></TitleBar>
        {timePeriods}
      </div>
    </div>
  );
}

export default App;
