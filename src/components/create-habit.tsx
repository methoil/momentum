import React, { useState, useRef, useEffect } from 'react';
import './css/crate-habit.scss';
import '../App.scss';
import { useDispatch } from 'react-redux';
import { createHabitRequest } from '../redux/actions/habit-thunks';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const CreateHabit: React.FC = () => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [habitName, setHabitName] = useState('');
  const inputNameEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput) {
      inputNameEl?.current?.focus();
    }
  }, [showInput]);

  return (
    <div className="create-habit-container">
      <div className="create-habit-label app-text">New Habit</div>
      <div className="create-habit-circle">
        {showInput ? (
          <div>
            <p className="app-text">Habit Name</p>
            <input
              type="text"
              ref={inputNameEl}
              className="new-habit-name-input"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              onKeyUp={onInputNewHabit}
            />
            <Button
              className="new-habit-cancel-input-button"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
            <Button className="new-habit-plus-button" onClick={onClickPlusIcon}>
              <AddCircleOutlineIcon style={{ fontSize: '9rem' }}></AddCircleOutlineIcon>
            </Button>
          )}
      </div>
    </div>
  );

  function onClickPlusIcon() {
    setShowInput(true);
    inputNameEl?.current?.focus(); // TODO: how to focus before it's created??
  }

  function onInputNewHabit(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      dispatch(createHabitRequest(habitName));
      setHabitName('');
      setShowInput(false);
    }
  }
};
