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
import { Redirect, useHistory } from 'react-router-dom';
import useAttemptLogin from '../hooks/useAttemptLogin';

export default function Login() {
  const dispatch = useDispatch();  
  const [creatingUser, setCreatingUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const browserHistory = useHistory();

  const user: IUser = useSelector((state: IState) => state.user);
  useAttemptLogin(user);

  function submitForms() {
    creatingUser
      ? dispatch(createUser(email, password, username))
      : dispatch(loginUser(email, password));
  }

  if (user.loggedIn)
    return <Redirect to="/dashboard"></Redirect>

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
            <Button onClick={() => browserHistory.push('/Dashboard')}>
              Try Without Account
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
}
