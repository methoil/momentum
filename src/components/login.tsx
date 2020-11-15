import React from "react";

export default function Login() {
  let loggedIn = true;
  try {
    let bearerToken = localStorage.getItem("BEARER_TOKEN");
    
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
