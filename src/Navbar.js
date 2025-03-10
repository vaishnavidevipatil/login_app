import React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn && (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          )}

          <div className="d-flex">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="logout"  style={{ height:"50px", width:"90px", textAlign:"center",textAlignLast:"left", marginRight:"10px"}}onClick={handleLogout}>
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;