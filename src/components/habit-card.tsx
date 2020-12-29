import React from "react";
import "./css/habit-card.scss";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { removeHabitRequest } from '../redux/actions/habit-actions';

interface IProps {
  name: string,
  _id: string,
}

export default function HabitCard(props: IProps) {
  const { name, _id } = props;
  const dispatch = useDispatch();
  return (
    <div className="habit-card">
      <div className="habit-card-remove-button">
        <IconButton onClick={() => dispatch(removeHabitRequest(_id))}>
          <HighlightOffIcon></HighlightOffIcon>
        </IconButton>
      </div>
      <div className="habit-card-title strong">{name}</div>
    </div>
  );
}
