import React from "react";
import "./App.css";
import Link from "./components/link";
import HabitCard from "./components/habit-card";
import habits from "./mock-data.json";

function App() {
  const timePeriods = [];
  for (let habit of habits) {
    const links = [];
    // for mock, started 10 days ago
    links.push(<HabitCard habitMeta={habit}></HabitCard>);

    for (let i = 0; i < 10; i++) {
      links.push(<Link active={!(i % 2)}></Link>);
    }

    timePeriods.push(<div className="time-period-container">{links}</div>);
  }

  return (
    <div className="App">
      <header className="App-header">Momentum - powerfully build habits</header>
      <div className="chains-container">{timePeriods}</div>
    </div>
  );
}

export default App;
