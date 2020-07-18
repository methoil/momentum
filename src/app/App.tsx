import React, { useEffect } from 'react';
import './App.css';
import { HabitChain } from '../components/habit-chain';
import habits from '../mock-data.json';
import { useDispatch, useSelector } from 'react-redux';
import { IHabitCollection, IHabitMeta } from '../habits.model';
import { IState, loadDatesAction } from '../redux/reducer';

function App() {
  const timePeriods: JSX.Element[] = [];
  const mockData = generateMockData();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDatesAction(mockData));
  }, []);

  const habitMeta = useSelector((state: IState) => state.habitHistory);

  // TODO: this will probably need to be an array to preserve the order
  Object.entries(habitMeta).map((meta) => {
    const chainComp = <HabitChain habitMeta={meta[1]} key={Math.random()}></HabitChain>;
    timePeriods.push(chainComp);
  });

  return (
    <div className="App">
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">{timePeriods}</div>
    </div>
  );
}

function generateMockData() {
  const habitMeta: IHabitCollection = {};
  for (let habit of habits) {
    const history = new Array(10)
      .fill(null)
      .map((entry, idx) => ({ date: new Date(2020, 8, idx), active: Math.random() * 2 > 1 }));

    habitMeta[habit.name] = {
      history,
      name: habit.name,
      type: habit.type,
    };
  }
  return habitMeta;
}

export default App;
