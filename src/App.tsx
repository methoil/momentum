import React, { useEffect } from 'react';
import './App.scss';
import HabitGrid from './components/habit-grid';
import Login from './components/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { IState } from './redux/reducer';

function App() {
  return (
    <div className={'App'}>
      <Router>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/dashboard">
        <HabitGrid></HabitGrid>
        </Route>
      </Router>
    </div>
  );
}

export default App;
