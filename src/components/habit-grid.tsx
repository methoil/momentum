import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { IState } from "../redux/reducer";
import { TitleBar } from "./dates-title-bar";
import { HabitChain } from "./habit-chain";

export default function HabitGrid() {
  // TODO: change this to mapStateToProps?
  const habitIds = useSelector((state: IState) => state.habitHistory).map(
    (habit) => habit._id
  );
  const displayedDates = useSelector((state: IState) => state.displayedDates);
  const timePeriods: JSX.Element[] = [];

  habitIds.map((id) => {
    const chainComp = <HabitChain habitId={id} key={id}></HabitChain>;
    timePeriods.push(chainComp);
  });

  return (
    <div className="App">
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">
        <TitleBar dates={displayedDates}></TitleBar>
        {timePeriods}
      </div>
    </div>
  );
}
