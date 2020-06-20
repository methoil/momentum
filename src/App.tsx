import React from "react";
import "./App.css";
import Link from "./components/link";
import habits from "./mock-data.json";

function App() {
  const timePeriods = [];
  for (let habit in habits) {
    const links = [];
    // for mock, started 10 days ago
    for (let i = 0; i < 10; i++) {
      links.push(
        <div>
          <span>{habits[habit]}</span>
          <span>
            <Link active={!(i % 2)}></Link>
          </span>
        </div>
      );
    }

    timePeriods.push(
      <div>
        <span></span>
        <span>{links}</span>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">Momentum - powerfully build habits</header>
      <div className="links-container">{timePeriods}</div>
    </div>
  );
}

export default App;
