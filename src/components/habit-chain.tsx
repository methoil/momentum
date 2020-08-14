import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

// import "./habit-chain.scss";
import Link from "./link";
import HabitCard from "./habit-card";
import { IHabitMeta, IHabitLink } from "../habits.model";
import { toggleLinkAction } from "../redux/reducer";

interface IProps {
  dateLabels: string[];
  habitMeta: IHabitMeta;
}

export const HabitChain: React.FC<IProps> = ({ habitMeta, dateLabels }) => {
  const dispatch = useDispatch();
  const links = [];
  // for mock, started 10 days ago
  links.push(<HabitCard habitMeta={habitMeta} key={Math.random()}></HabitCard>);

  for (let i = 0; i < dateLabels.length; i++) {
    let day;
    if (i < habitMeta.history.length) {
      day = habitMeta.history[i]; // will need to match differently???
    } else {
      day = {
        active: false,
        date: new Date(dateLabels[i]),
      };
    }

    const key = uuid();
    links.push(
      <Link
        active={day?.active || false}
        callback={onToggleLink(key, habitMeta.name, day)}
        key={key}
      ></Link>
    );

    if (day.active && habitMeta.history[i + 1]?.active) {
      links.push(<div className="active-link-connector"></div>);
    }
  }

  return <div className="time-period-container">{links}</div>;

  function onToggleLink(id: string, name: string, linkData: IHabitLink) {
    const payload = {
      ...linkData,
      active: !linkData.active,
    };
    return () => dispatch(toggleLinkAction(id, name, payload));
  }
};
