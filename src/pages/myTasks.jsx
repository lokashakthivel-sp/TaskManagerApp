import React from "react";
import { useNavigate } from "react-router-dom";

function MyTasks({ setIsLoggedIn, globalUsername }) {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    //TODO: add proper logout functionality
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <>
      <div className="app-container">
        <h1>My Tasks</h1>
        <h2 className="app-inner-text">Welcome! {globalUsername}</h2>
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default MyTasks;
