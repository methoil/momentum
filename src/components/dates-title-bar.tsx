import React from "react";
import "./css/dates-title-bar.scss";

interface IProps {
  dates: string[];
}


export const TitleBar: React.FC<IProps> = ({ dates }) => {

  const nameElements = dates.map((date, idx) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-us', { month: 'long' });
    const dayOfWeek = dateObj.toLocaleString('en-us', { weekday: 'short' });
    const dateParts = date.split('-');
    const dayOfMonth = dateParts?.[2];
    const monthNum = dateParts?.[1];
    const year = dateParts?.[0];

    const monthYearLabel = `${month} ${year}`;
    return (
      <div>
        <div className="date-string-in-title">{idx === 0 || dates[idx - 1].split('-')[1] !== `${monthNum}` ? monthYearLabel : ` `}</div>
        <div className="date-string-in-title" key={date}>{`${dayOfWeek} ${dayOfMonth}`}</div>
      </div>
    );
  });

  return (
    <div className="time-period-container dates-title-bar">
      <div className="date-titlebar-left-label">Habits:</div>
      {nameElements}
    </div>
  );
};
