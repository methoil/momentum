import React from "react";
// import "./habit-chain.scss";
import Link from "./link";
import HabitCard from "./habit-card";
import { IHabitMeta } from "../habits.model";

interface IProps {
  history: Array<boolean>;
  habitMeta: IHabitMeta;
}

export const HabitChain: React.FC<IProps> = ({ history, habitMeta }) => {
  const links = [];
  // for mock, started 10 days ago
  links.push(<HabitCard habitMeta={habitMeta} key={Math.random()}></HabitCard>);

  for (let day of history) {
    links.push(<Link active={day} key={Math.random()}></Link>);
  }

  return <div className="time-period-container">{links}</div>;
};
