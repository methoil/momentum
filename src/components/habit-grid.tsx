import { throttle } from '../services/utils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  updateHabits,
} from '../redux/actions/habit-thunks';

import { IState, IUser } from '../redux/reducer';
import { TitleBar } from './dates-title-bar';
import { HabitChain } from './habit-chain';
import { CreateHabit } from './create-habit';
import './css/habit-grid.scss';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../redux/actions/user-actions';
import useAttemptLogin from '../hooks/useAttemptLogin';

export default function HabitGrid() {
  const habitIds = useSelector((state: IState) => state.habitHistory).map(
    (habit) => habit._id
  );
  const user: IUser = useSelector((state: IState) => state.user);
  useAttemptLogin(user, true);

  const browserHistory = useHistory();
  const dispatch = useDispatch();
  const throttledSaveDates = throttle(
    () => dispatch(updateHabits()),
    5000
  );

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

  const displayedDates = useSelector((state: IState) => state.displayedDates);
  const habitElements: JSX.Element[] = habitIds.map((id) => {
    return (
      <HabitChain
        habitId={id}
        key={id}
        throttledSaveDates={throttledSaveDates}
      ></HabitChain>
    );
  });

  const LoginComponent = () => {
    return <div className="grid-login-info-container app-text">
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
  }

  return (
    <div className="grid-view-container">
      <header className="grid-view-header">
        <h1 className="App-header" id="grid-view-title">Momentum</h1>
        <LoginComponent></LoginComponent>
      </header>
      <div className="chains-container">
        <TitleBar dates={displayedDates}></TitleBar>
        {habitElements}
        <CreateHabit></CreateHabit>
      </div>
    </div>
  );
}
