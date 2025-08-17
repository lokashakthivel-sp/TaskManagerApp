import { useState, useEffect } from "react";
import { auth } from "../auth/auth";

function Login({ setIsLoggedIn }) {
  let [isNewUser, setIsNewUser] = useState(false);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // Load users from localStorage or fallback to auth
  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : auth;
  };

  const setUsers = (users) => {
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

    console.log(users);

    setIsNewUser(false);
  };

  return (
    <>
      <div className="app-container">
        <form className="login-form" action="">
          {isNewUser ? <h1>Sign Up</h1> : <h1>Login</h1>}
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
          {isNewUser ? (
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
