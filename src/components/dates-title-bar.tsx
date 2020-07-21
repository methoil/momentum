import React from "react";
import "../app/App.css";

interface IProps {
  history: Date[];
}
const MAX_HISTORY = 365;

export const TitleBar: React.FC<IProps> = ({ history }) => {
  const today = new Date().toDateString();

  // We can expect the date info to come it sorted - as I will be passing it in
  // we could even sort it here but it's not an efficient place to do it, eso with larger data
  const dates: string[] = [];
  var date = new Date();

  // add a day
  date.setDate(date.getDate() + 1);

  let count = 0;
  while (count < history.length || count < MAX_HISTORY) {
    const currDateStr = date.toDateString();
    if (history[count].toDateString() === currDateStr) {
      count++;
    }
    dates.push(currDateStr);
  }

  const nameElements = dates.map((date) => (
    <div className="date-string-in-title">{date}</div>
  ));

  return (
    <div className="time-period-container dates-title-bar">
      <div className="date-titlebar-left-label">Habits:</div>
      {nameElements}
    </div>
  );
};
