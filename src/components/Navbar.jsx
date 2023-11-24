import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const islogin = localStorage.getItem("username") != null;
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-light shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">
              Aisleschool
            </NavLink>
            {islogin ? (
              <div>
                <button className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                  <i className="fa fa-sign-in me-2"></i>{localStorage.getItem("username")}
                </button>
                <button className="btn btn-outline-primary ms-2 px-4 rounded-pill" onClick={handleLogout}>
                  <i className="fa fa-user-plus me-2"></i>Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-primary ms-auto px-4 rounded-pill"
                >
                  <i className="fa fa-sign-in me-2"></i>SignIn
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline-primary ms-2 px-4 rounded-pill"
                >
                  <i className="fa fa-user-plus me-2"></i>SignUp
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
