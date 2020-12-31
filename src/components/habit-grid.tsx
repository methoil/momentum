import { throttle } from '../services/utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadDatesFromServer,
  saveDatesToServer,
} from '../redux/actions/habit-thunks';

import { IState } from '../redux/reducer';
import { TitleBar } from './dates-title-bar';
import { HabitChain } from './habit-chain';
import { CreateHabit } from './create-habit';
import './css/habit-grid.scss';
import Button from '@material-ui/core/Button';
import { generateDisplayedDates } from '../services/date-utils';
import { logoutUser } from '../redux/actions/user-actions';

export default function HabitGrid() {
  const habitIds = useSelector((state: IState) => state.habitHistory).map(
    (habit) => habit._id
  );
  const username: string = useSelector((state: IState) => state.user.username);
  useEffect(() => {
    const displayedDates = generateDisplayedDates(30);
    dispatch(loadDatesFromServer(displayedDates));
  }, []);

  const dispatch = useDispatch();
  const throttledSaveDates = throttle(
    () => dispatch(saveDatesToServer()),
    5000
  );

  const displayedDates = useSelector((state: IState) => state.displayedDates);
  const habitElements: JSX.Element[] = [];

  habitIds.map((id) => {
    const chainComp = (
      <HabitChain
        habitId={id}
        key={id}
        throttledSaveDates={throttledSaveDates}
      ></HabitChain>
    );
    habitElements.push(chainComp);
  });

  return (
    <div>
      <div className="grid-login-logout-info app-text">
        <p>Logged in as {username}</p>
        <Button onClick={() => dispatch(logoutUser())}>Loggout</Button>
      </div>
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">
        <TitleBar dates={displayedDates}></TitleBar>
        {habitElements}
        <CreateHabit></CreateHabit>
      </div>
    </div>
  );
}
