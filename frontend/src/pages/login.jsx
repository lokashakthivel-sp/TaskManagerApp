import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setGlobalUsername }) {
  const navigate = useNavigate();
  //to show sign up page
  let [isNewUser, setIsNewUser] = useState(false);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data.username); // Username from the server
      setIsNewUser(false);
      setIsLoggedIn(true);
      setGlobalUsername(data.username);
      navigate("/mytasks");
    } else {
      setEmail("");
      setPassword("");
      setUsername("");
      alert(data.error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data.username); // username from the server
      setIsLoggedIn(true);
      setGlobalUsername(data.username);
      navigate("/mytasks");
    } else {
      setEmail("");
      setPassword("");
      setUsername("");
      alert(data.error);
    }
  };

  return (
    <>
      <div className="app-container">
        <form className="login-form">
          {
            //conditionally rendering sign up or login in the heading
            isNewUser ? <h1>Sign Up</h1> : <h1>Login</h1>
          }
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
          {
            //conditionally rendering sign up or login in the button and also to switch between login and sign up forms
            isNewUser ? (
              <>
                <button type="submit" onClick={handleSignUp}>
                  Sign Up
                </button>
                <p>
                  Have an account?{" "}
                  <span
                    onClick={() => {
                      setIsNewUser(false);
                    }}
                    className="sign-up"
                  >
                    Login!
                  </span>
                </p>
              </>
            ) : (
              <>
                <button type="submit" onClick={handleLogin}>
                  Login
                </button>
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
              </>
            )
          }
        </form>
      </div>
    </>
  );
}

export default Login;
