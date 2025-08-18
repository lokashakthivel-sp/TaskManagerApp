import { useState, useEffect } from "react";
import { auth } from "../server/server";

function Login({ setIsLoggedIn }) {
  //to show sign up page
  let [isNewUser, setIsNewUser] = useState(false);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // Load users from localStorage or if not available use to auth
  const getUsers = () => {
    const users = localStorage.getItem("users");
    //since it users is string type we need to parse to JSON object style
    return users ? JSON.parse(users) : auth;
  };

  const setUsers = (users) => {
    //in local storage only strings can be stored so we need to convert the JSON objects into strings
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleLogin = (e) => {
    //TODO: add proper login functionality, here using just a fake authentication
    e.preventDefault();
    let users = getUsers();

    console.log(users);
    
    let flag = 0;
    for (let user of users) {
      if (
        user.username === username &&
        user.email === email &&
        user.password === password
      ) {
        setIsLoggedIn(true);
        localStorage.setItem("isLocalLoggedIn", "true");
        //to access the username in my tasks page
        localStorage.setItem("loggedInUser",username);
        flag = 1;
      }
      if (flag) break;
    }
    if (!flag) {
      setEmail("");
      setPassword("");
      setUsername("");
      alert("Invalid user credentials entered");
    }
  };

  const handleSignUp = (e) => {
    //TODO: add proper sign up functionality, here using just a fake authentication
    e.preventDefault();
    let users = getUsers();
    users.push({
      username: username,
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    setUsername("");
    setUsers(users);

    setIsNewUser(false);
  };

  return (
    <>
      <div className="app-container">
        <form className="login-form" action="">
          {//conditionally rendering sign up or login in the heading
          isNewUser ? <h1>Sign Up</h1> : <h1>Login</h1>}
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
          />
          {//conditionally rendering sign up or login in the button
          isNewUser ? (
            <button type="submit" onClick={handleSignUp}>
              Sign Up
            </button>
          ) : (
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          )}
          <p>
            New user?{" "}
            <span
              onClick={() => {
                setIsNewUser(true);
              }}
              className="sign-up"
            >
              Sign up!
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
