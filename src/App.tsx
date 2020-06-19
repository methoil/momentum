import React from "react";
import "./App.css";
import Link from "./components/link";

function App() {
  const links = [];
  for (let i = 0; i < 10; i++) {
    links.push(<Link active={!(i % 2)}></Link>);
  }

  return (
    <div className="App">
      <header className="App-header">Momentum - powerfully build habits</header>
      <div>{links}</div>
    </div>
  );
}

export default App;
