import React from "react";

export default async function Login() {
  let loggedIn = true;
  try {
    let bearerToken = localStorage.getItem("BEARER_TOKEN");
    if (bearerToken) {
      const userPromise = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/me`
      );
      const userInfo = await userPromise.json();

    }
  } catch (error) {
    loggedIn = false;
  }

  if (!loggedIn){
  return (
    <div>
      <div>
        <label>Email:</label>
        <input type="email" />
        <label>Password:</label>
        <input type="password" />
      </div>
      <div>
        <button>Login</button>
        <button>Create Account</button>
      </div>
    </div>
  );}
  else {
    return (
    <div>Logged in as {}</div>
    )
  }
}
