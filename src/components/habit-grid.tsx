import { throttle } from "../services/utils";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDatesToServer } from "../redux/actions";

import { IState } from "../redux/reducer";
import { TitleBar } from "./dates-title-bar";
import { HabitChain } from "./habit-chain";

export default function HabitGrid() {
  // TODO: change this to mapStateToProps?
  const habitIds = useSelector((state: IState) => state.habitHistory).map(
    (habit) => habit._id
  );

  const dispatch = useDispatch();
  const throttledSaveDates = throttle(() => dispatch(saveDatesToServer()), 5000);

  const displayedDates = useSelector((state: IState) => state.displayedDates);
  const timePeriods: JSX.Element[] = [];

  habitIds.map((id) => {
    const chainComp = <HabitChain habitId={id} key={id} throttledSaveDates={throttledSaveDates}></HabitChain>;
    timePeriods.push(chainComp);
  });

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(saveDatesToServer())}>Save</button>
      </div>
      <h1 className="App-header">Momentum</h1>
      <div className="chains-container">
        <TitleBar dates={displayedDates}></TitleBar>
        {timePeriods}
      </div>
    </div>
  );
}
