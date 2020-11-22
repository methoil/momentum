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
  const loggedIn: boolean = useSelector((state: IState) => state.user.loggedIn);

  return (
    <div className={'App'}>
      {loggedIn ? <HabitGrid></HabitGrid> : <Login></Login>}
    </div>
  );
}

export default App;
