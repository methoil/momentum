import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

// import "./habit-chain.scss";
import Link from './link';
import HabitCard from './habit-card';
import { IHabitMeta, IHabitLink } from '../habits.model';
import { toggleLinkAction } from '../redux/reducer';

interface IProps {
  habitMeta: IHabitMeta;
}

export const HabitChain: React.FC<IProps> = ({ habitMeta }) => {
  const dispatch = useDispatch();
  const links = [];
  // for mock, started 10 days ago
  links.push(<HabitCard habitMeta={habitMeta} key={Math.random()}></HabitCard>);




  for (let day of habitMeta.history) {
    const key = uuid();
    links.push(
      <Link
        active={day.active}
        callback={onToggleLink(key, habitMeta.name, day)}
        key={key}
      ></Link>,
    );
  }

  return <div className="time-period-container">{links}</div>;

  function onToggleLink(id: string, name: string, linkData: IHabitLink) {
    const payload = {
      ...linkData,
      active: !linkData.active,
    }
    return () => dispatch(toggleLinkAction(id, name, payload));
  }
};
