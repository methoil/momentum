import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

// import "./habit-chain.scss";
import Link from "./link";
import HabitCard from "./habit-card";
import { IHabitMeta, IHabitLink } from "../habits.model";
import { IState, toggleLinkAction } from "../redux/reducer";
import { DateStr } from "../app/services/date-utils";

interface IProps {
  habitId: string;
}

export const HabitChain: React.FC<IProps> = ({ habitId }) => {
  const dispatch = useDispatch();

  const habitMeta = useSelector((state: IState) =>
    state.habitHistory.find((habit) => habit._id === habitId)
  );
  const displayedDates = useSelector((state: IState) => state.displayedDates);
  if (!habitMeta) return <div></div>;

  const combined = habitMeta?.history;

  const links = [];
  // for mock, started 10 days ago
  links.push(<HabitCard name={habitMeta.name} key={habitMeta._id}></HabitCard>);

  for (let i = 0; i < combined.length; i++) {
    links.push(
      <Link
        active={combined[i]}
        callback={onToggleLink(habitMeta._id, i)}
        date={displayedDates[i]}
        key={`${habitMeta._id}-${displayedDates[i]}`}
      ></Link>
    );
    if (combined[i] && combined?.[i + 1]) {
      links.push(
        <div
          className="active-link-connector"
          key={`${displayedDates[i]}-link}`}
        ></div>
      );
    }
  }

  return <div className="time-period-container">{links}</div>;

  function onToggleLink(id: string, index: number) {
    combined[index] = !combined[index];
    const payload = {
      index,
      id,
      active: combined[index],
    };
    return () => dispatch(toggleLinkAction(payload));
  }
};
