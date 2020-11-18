import React from "react";
import { useDispatch } from "react-redux";
import {IAppState, store} from '../redux/store';
import { autoLoginFromBearer, createUser, loginUser } from "../redux/actions/user-actions";

export default function Login() {
  const dispatch = useDispatch();
  let loggedIn = true;
  let email = '';
  let password = '';
  let username = '';
  try {
    let bearerToken = localStorage.getItem("BEARER_TOKEN");
    if (bearerToken){
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
    email = event.target.value;
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    password = event.target.value;
  }

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    username = event.target.value;
  }

  if (!loggedIn){
  return (
    <div>
      <div>
        <label>Email:</label>
        <input type="email" onChange={handleEmailChange} />
        <label>Password:</label>
        <input type="password" onChange={handlePasswordChange}/>
        <label>Username:</label>
        <input type="text" onChange={handleUsernameChange}/>
      </div>
      <div>
        <button onClick={() => dispatch(loginUser(email, password))}>Login</button>
        <button onClick={() => dispatch(createUser(email, password, username))}>Create Account</button>
      </div>
    </div>
  );}
  else {
    return (
    <div>Logged in as {}</div>
    )
  }
}


// function mapStateToProps(state: IAppState) {
//   return {

//   }
// }