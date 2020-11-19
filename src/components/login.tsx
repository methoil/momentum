import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { IAppState, store } from '../redux/store';
import {
  autoLoginFromBearer,
  createUser,
  loginUser,
} from '../redux/actions/user-actions';
import { IUser } from '../redux/reducer';
import '../App.css';

interface IProps extends IUser {}

function Login(Props: IProps) {
  const { email, username, token } = Props;
  const dispatch = useDispatch();
  let loggedIn = false;
  let formEmail = '';
  let formPassword = '';
  let formUsername = '';

  if (token) {
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
    return <div>Logged in as {username}</div>;
  }
}

function mapStateToProps(state: IAppState) {
  return Object.assign({}, state.user);
}

export default connect(mapStateToProps)(Login);
