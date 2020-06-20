import React from "react";
import "./habit-card.scss";

interface IProps {
  habitMeta: { name: string; type: string; dateStarted: string };
}

export default function HabitCard(props: IProps) {
  const { name, type, dateStarted } = props.habitMeta;
  return (
    <div className="habit-card">
      <div className="habit-card-text-item strong">{name}</div>
      <div className="habit-card-text-item">{type}</div>
      <div className="habit-card-text-item">{dateStarted}</div>
    </div>
  );
}
