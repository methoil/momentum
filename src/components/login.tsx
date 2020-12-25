import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  autoLoginFromBearer,
  createUser,
  loginUser,
} from '../redux/actions/user-actions';
import { IState, IUser } from '../redux/reducer';
import '../App.scss';
import './css/login.scss';
import Button from '@material-ui/core/Button';

export default function Login() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: IState) => state.user);
  const [creatingUser, setCreatingUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  let bearerToken = localStorage.getItem('BEARER_TOKEN');
  if (bearerToken && !user.loggedIn) {
    try {
      dispatch(autoLoginFromBearer(bearerToken));
    } catch (error) {
      localStorage.removeItem('BEARER_TOKEN');
    }
  }

  function submitForms() {
    creatingUser
      ? dispatch(createUser(email, password, username))
      : dispatch(loginUser(email, password));
  }

  if (!user.loggedIn) {
    return (
      <div className={'login-container app-text'}>
        <h1 className="App-header">Momentum</h1>
        <div className={'login-controls-box'}>
          <div className="login-control-box-header">
            <div></div>
            <h3>{creatingUser ? 'Create Account' : 'Login'}</h3>
            <div>
              <Button onClick={() => setCreatingUser(!creatingUser)}>
                {creatingUser ? 'Login instead' : 'Create new user'}
              </Button>
            </div>
          </div>
          <div className={'login-form-containers app-text'}>
            {creatingUser ? (
              <div>
                <div className={'login-form-label'}>Username:</div>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            ) : (
              ''
            )}
            <div>
              <div className={'login-form-label'}>
                <label>Email</label>:
              </div>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className={'login-form-label'}>Password:</div>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button onClick={submitForms}>Submit</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={'app-text'}>Logged in as {user.username}</div>;
  }
}
