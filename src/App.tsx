import React from "react";
import "./App.css";
import HabitChain from "./components/habit-chain";
import habits from "./mock-data.json";

function App() {
  const timePeriods = [];
  for (let habit of habits) {
    const history = new Array(10)
      .fill(null)
      .map((entry) => Math.random() * 2 > 1);
    const chainComp = (
      <HabitChain
        habitMeta={habit}
        history={history}
        key={Math.random()}
      ></HabitChain>
    );

    timePeriods.push(chainComp);
  }

  return (
    <div className="App">
      <header className="App-header">Momentum - powerfully build habits</header>
      <div className="chains-container">{timePeriods}</div>
    </div>
  );
}

export default App;
