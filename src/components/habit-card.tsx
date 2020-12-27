import React from "react";
import "./css/habit-card.scss";

interface IProps {
  name: string,
  type?: string,
}

export default function HabitCard(props: IProps) {
  const { name, type } = props;
  return (
    <div className="habit-card">
      <div className="habit-card-text-item strong">{name}</div>
      <div className="habit-card-text-item">{type || 'daily'}</div>
      {/* <div className="habit-card-text-item">{history}</div> */}
    </div>
  );
}
