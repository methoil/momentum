import React, { useEffect } from 'react';
import './App.scss';
import HabitGrid from './components/habit-grid';
import Login from './components/login';
import { useSelector } from 'react-redux';
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
