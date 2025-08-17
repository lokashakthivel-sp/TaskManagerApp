import React from "react";
import "./navbar.css";
function Navbar() {
  return (
    <>
      <nav>
        <li>Task Manager</li>
        <li>
          <a href="home">Home</a>
        </li>
        <li>
          <a href="mytasks">My Tasks</a>
        </li>
        <li>
          <a href="about">About</a>
        </li>
      </nav>
    </>
  );
}

export default Navbar;
