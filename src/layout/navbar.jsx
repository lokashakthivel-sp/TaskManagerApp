import { useContext } from "react";
import { Link } from "react-router-dom";
import "./layout.css";
import { isLoginContext } from "../App";
function Navbar() {
  const isLoggedIn = useContext(isLoginContext);
  return (
    <>
      <nav>
        <span>Task Manager</span>
        <Link className="nav-link" to="/home">
          Home
        </Link>
        {isLoggedIn ? (
          <Link className="nav-link" to="/mytasks">
            My Tasks
          </Link>
        ) : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}
        <Link className="nav-link" to="/about">
          About
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
