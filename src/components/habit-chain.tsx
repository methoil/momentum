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
        updatePromise={onToggleLink(key, habitMeta.name, day)}
        key={key}
      ></Link>
    );
  }

  return <div className="time-period-container">{links}</div>;

  async function onToggleLink(id: string, name: string, linkData: IHabitLink) {
    const SERVICE_URL = "localhost:8001";
    const payload = {
      ...linkData,
      active: !linkData.active,
    };

    const req = {
      method: "POST",
      body: JSON.stringify(linkData),
    };

    try {
      await fetch(SERVICE_URL, req);
      return dispatch(toggleLinkAction(id, name, payload));
    } catch (err) {
      // todo: add logging
      console.error(err);
      return err;
    }
  }
};
