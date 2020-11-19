import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  autoLoginFromBearer,
  createUser,
  loginUser,
} from '../redux/actions/user-actions';
import { IState, IUser } from '../redux/reducer';
import '../App.css';

export default function Login() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: IState) => state.user);
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

  if (!loggedIn) {
    return (
      <div>
        <div className={'app-text'}>
          <label>Email:</label>
          <input type="email" onChange={handleEmailChange} />
          <label>Password:</label>
          <input type="password" onChange={handlePasswordChange} />
          <label>Username:</label>
          <input type="text" onChange={handleUsernameChange} />
        </div>
        <div>
          <button onClick={() => dispatch(loginUser(formEmail, formPassword))}>
            Login
          </button>
          <button
            onClick={() =>
              dispatch(createUser(formEmail, formPassword, formUsername))
            }
          >
            Create Account
          </button>
        </div>
      </div>
    );
  } else {
    return <div className={'app-text'}>Logged in as {user.username}</div>;
  }
}
