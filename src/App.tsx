import React, { useEffect } from 'react';
import './App.css';
import HabitGrid from './components/habit-grid';
import Login from './components/login';
import { useDispatch, useSelector } from 'react-redux';
import {
  LoadDatesAction,
  loadDatesFromServer,
} from './redux/actions/habit-actions';
import { DateStr, toDateStr } from './services/date-utils';
import { IState } from './redux/reducer';

function App() {
  // TODO: login here
  const dispatch = useDispatch();
  const displayedDates = generateDisplayedDates(30);
  dispatch(loadDatesFromServer(displayedDates));
  const loggedIn: boolean = useSelector((state: IState) => state.user.loggedIn);

  return (
    <div className={'App'}>
      {loggedIn ? <HabitGrid></HabitGrid> : <Login></Login>}
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
