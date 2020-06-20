import React from "react";
// import "./habit-chain.scss";
import Link from "./link";
import HabitCard from "./habit-card";

interface IProps {
  history: Array<boolean>;
  habitMeta: { name: string; type: string; dateStarted: string };
}

export default function HabitChain(props: IProps) {
  const { history, habitMeta } = props;
  const links = [];
  // for mock, started 10 days ago
  links.push(<HabitCard habitMeta={habitMeta} key={Math.random()}></HabitCard>);

  for (let day of history) {
    links.push(<Link active={day} key={Math.random()}></Link>);
  }

  return <div className="time-period-container">{links}</div>;
}
