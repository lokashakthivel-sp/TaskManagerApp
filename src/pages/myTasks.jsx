import React from "react";

function MyTasks({ setIsLoggedIn }) {
  //getting the local stored username
  const username = localStorage.getItem("loggedInUser");
  
  const handleLogout = (e) => {
    e.preventDefault();
    //TODO: add proper logout functionality
    setIsLoggedIn(false);
    localStorage.removeItem("isLocalLoggedIn");
  };
  return (
    <>
      <div className="app-container">
        <h1>My Tasks</h1>
        <h2 className="app-inner-text">Welcome! {username}</h2>
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default MyTasks;
