import React from "react";
import "./habit-card.scss";
import { IHabitMeta } from "../habits.model";

interface IProps {
  habitMeta: IHabitMeta;
}

export default function HabitCard(props: IProps) {
  const { name, type, history } = props.habitMeta;
  return (
    <div className="habit-card">
      <div className="habit-card-text-item strong">{name}</div>
      <div className="habit-card-text-item">{type}</div>
      {/* <div className="habit-card-text-item">{history}</div> */}
    </div>
  );
}
