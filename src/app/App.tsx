import React, { useEffect } from "react";
import "./App.css";
import { HabitChain } from "../components/habit-chain";
import mockData from "../mock-data.json";
import { useDispatch, useSelector } from "react-redux";
import { IDateHistory, IHabitCollection, IHabitMeta } from "../habits.model";
import { HabitModel, IState, loadDatesAction } from "../redux/reducer";
import { TitleBar } from "../components/dates-title-bar";
import { DateStr, toDateStr } from "./services/date-utils";

async function App() {
  const timePeriods: JSX.Element[] = [];

  // TODO: login here
  // const bearerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjllMTc3ODIzM2Y1NTU4YzgxMTg5MDYiLCJpYXQiOjE2MDQxOTYyMTd9.4TNDCHjTOkEGMeAIHZbx68EcSa4muqxW1M3wcPY_PTY';

  // const habitData = await fetch(`${process.env.REACT_APP_SERVER_URL}/habits` || '',  {
  //   headers: {Authorization: bearerToken},
  // });
const displayedDates = generateDisplayedDates(30);
  const habitHistory: HabitModel[] = mockData.map((habit) => {
    const { name, history, _id } = habit;
    


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
  const loadAppPayload = {
    ownerId: mockData?.[0]?.owner || "",
    displayedDates,
    habitHistory,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDatesAction(loadAppPayload));
  }, []);

  const habitMeta = useSelector((state: IState) => state.habitHistory);
 

  // TODO: this will probably need to be an array to preserve the order
  habitMeta.map((meta) => {
    const chainComp = (
      <HabitChain
        habitId={meta._id}
        key={Math.random()}
      ></HabitChain>
    );
    timePeriods.push(chainComp);
  });

  return (
    <div className="App">
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">
        <TitleBar dates={displayedDates}></TitleBar>
        {timePeriods}
      </div>
    </div>
  );
}

function generateDisplayedDates(daysBack: number): DateStr[] {
  const labels: DateStr[] = [];
  const date = new Date();
  for (let i = 0; i < daysBack; i++) {
    labels.push(toDateStr(date));
    date.setDate(date.getDate() - 1);
  }
  return labels;
}

export default App;
