import React from "react";
import "./css/dates-title-bar.scss";

interface IProps {
  dates: string [];
}


export const TitleBar: React.FC<IProps> = ({ dates }) => {

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
