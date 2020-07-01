import React from "react";
import "./App.css";
import { HabitChain } from "../components/habit-chain";
import habits from "../mock-data.json";
import { useDispatch } from 'react-redux';
import { IHabitMeta } from '../habits.model';

function App() {
  const timePeriods = [];
  const habitMeta: {[key: string]: IHabitMeta} = {};
  for (let habit of habits) {
    
    const history = new Array(10)
      .fill(null)
      .map((entry) =>({date: '', active: Math.random() * 2 > 1}));
    
      
      habitMeta[habit.name] = {
        history,
        name: habit.name,
        type: habit.type,
      };
    
    
    const chainComp = (
      <HabitChain
        habitMeta={habitMeta[habit.name]}
        key={Math.random()}
      ></HabitChain>
    );

    timePeriods.push(chainComp);
  }

  useDispatch();

  return (
    <div className="App">
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">{timePeriods}</div>
    </div>
  );
}

export default App;
