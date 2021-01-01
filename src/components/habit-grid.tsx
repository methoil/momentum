import { throttle } from '../services/utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  loadHabits,
  updateHabits,
} from '../redux/actions/habit-thunks';

import { IState, IUser } from '../redux/reducer';
import { TitleBar } from './dates-title-bar';
import { HabitChain } from './habit-chain';
import { CreateHabit } from './create-habit';
import './css/habit-grid.scss';
import Button from '@material-ui/core/Button';
import { generateDisplayedDates } from '../services/date-utils';
import { loginUser, logoutUser } from '../redux/actions/user-actions';

export default function HabitGrid() {
  const habitIds = useSelector((state: IState) => state.habitHistory).map(
    (habit) => habit._id
  );
  const user: IUser = useSelector((state: IState) => state.user);
  useEffect(() => {
    const displayedDates = generateDisplayedDates(30);
    dispatch(loadHabits(displayedDates));
  }, []);

  const browserHistory = useHistory();
  const dispatch = useDispatch();
  const throttledSaveDates = throttle(
    () => dispatch(updateHabits()),
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

  const onLoggout = async () => {
    try {
      await dispatch(logoutUser());
      toLogginView();
    } catch (error) {
      console.error(error);
    }
  }

  const toLogginView = async () => {
    browserHistory.push('login');
  }

  return (
    <div>
      <div className="grid-login-logout-info app-text">
        {user.loggedIn ?
          <>
            <p>Logged in as {user.username}</p>
            <Button onClick={() => onLoggout()}>Log Out</Button>
          </> :
          <>
            <p>You are not logged in - Log in or create an account to persist your habits and access them from other devices.</p>
            <Button onClick={() => toLogginView()}>Log In</Button>
          </>}
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
