import React, { useState } from 'react';
import './css/crate-habit.scss';
import '../App.scss';
import { useDispatch } from 'react-redux';
import { createHabitRequest } from '../redux/actions/habit-actions';

export const CreateHabit: React.FC = () => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [habitName, setHabitName] = useState('');

  return (
    <div className="create-habit-container">
      <div className="create-habit-label app-text">New Habit</div>
      <div className="create-habit-circle">
        {showInput ? (
          <div>
            <p className="app-text">Habit Name</p>
            <input
              type="text"
              className="new-habit-name-input"
              onChange={(e) => setHabitName(e.target.value)}
              onKeyUp={onInputNewHabit}
            />
            <button
              className="new-habit-cancel-input-button"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            className="new-habit-plus-char"
            onClick={() => setShowInput(true)}
          >
            +
          </div>
        )}
      </div>
    </div>
  );

  function onInputNewHabit(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      dispatch(createHabitRequest(habitName));
    }
  }
};
