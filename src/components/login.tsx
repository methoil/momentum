import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  autoLoginFromBearer,
  createUser,
  loginUser,
} from '../redux/actions/user-actions';
import { IState, IUser } from '../redux/reducer';
import '../App.css';
import './css/login.scss';

export default function Login() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: IState) => state.user);
  const [creatingUser, setCreatingUser] = useState(false);
  let loggedIn = false;
  let formEmail = '';
  let formPassword = '';
  let formUsername = '';

  if (user.token) {
    loggedIn = true;
  }

  try {
    let bearerToken = localStorage.getItem('BEARER_TOKEN');
    if (bearerToken) {
      try {
        dispatch(autoLoginFromBearer(bearerToken));
      } catch (error) {
        loggedIn = false;
      }
    }
  } catch (error) {
    loggedIn = false;
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    formEmail = event.target.value;
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    formPassword = event.target.value;
  }

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    formUsername = event.target.value;
  }

  function submitForms() {
    creatingUser
      ? dispatch(createUser(formEmail, formPassword, formUsername))
      : dispatch(loginUser(formEmail, formPassword));
  }

  if (!loggedIn) {
    return (
      <div className={'login-container app-text'}>
        <h1>Momentum</h1>
        <div className={'login-controls-box'}>
          <h3>{creatingUser ? 'Create Account' : 'Login'}</h3>
          <div className={'login-form-containers app-text'}>
            {creatingUser ? (
              <div>
                <div className={'login-form-label'}>Username:</div>
                <input type="text" onChange={handleUsernameChange} />
              </div>
            ) : (
              ''
            )}
            <div>
              <div className={'login-form-label'}>
                <label>Email</label>:
              </div>
              <input type="email" onChange={handleEmailChange} />
            </div>
            <div>
              <div className={'login-form-label'}>Password:</div>
              <input type="password" onChange={handlePasswordChange} />
            </div>
          </div>
          <div>
            <button onClick={submitForms}>Submit</button>
          </div>
          <div>
            <button onClick={() => setCreatingUser(!creatingUser)}>
              {creatingUser ? 'Login instead' : 'Create new user'}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={'app-text'}>Logged in as {user.username}</div>;
  }
}
