import React, { useEffect } from "react";
import "./App.css";
import HabitGrid from "../components/habit-grid";
import mockData from "../mock-data.json";
import { useDispatch } from "react-redux";
import { HabitModel, IState } from "../redux/reducer";
import { LoadDatesAction, loadDatesFromServer } from "../redux/actions";
import { DateStr, toDateStr } from "./services/date-utils";

function App() {
  // TODO: login here
  const dispatch = useDispatch();
  const displayedDates = generateDisplayedDates(30);  
  dispatch(loadDatesFromServer(displayedDates));

  return <HabitGrid></HabitGrid>;
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
