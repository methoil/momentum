import React from "react";
import "./css/habit-card.scss";
import RemoveHabitButton from './remove-habit-button';

interface IProps {
  name: string,
  _id: string,
}

export default function HabitCard(props: IProps) {
  const { name, _id } = props;
  return (
    <div className="habit-card">
      <div className="habit-card-remove-button">
        <RemoveHabitButton name={name} _id={_id}></RemoveHabitButton>
      </div>
      <div className="habit-card-title strong">{name}</div>
    </div>
  );
}
