import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Logout } from "../Redux/Action/LogOut";
import { clearCurrentProfile } from "../Redux/Action/Profile";

function Navbar(props) {
  const { isAuthenticated, user } = props.auth;
  const LogoutUser = e => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.Logout();
  };
  const LoggedInLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link" onClick={LogoutUser}>
          <img
            className="rounded-circle"
            style={{ width: "25px", marginRight: "0.5rem" }}
            src={user.avatar}
            alt="No Preview"
            title="Your Image Is Seleted By Gravatar Based On Email"
          />
          Logout
        </a>
      </li>
    </ul>
  );
  const LoggedOutLink = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark mb-4 bg-dark">
      <div className="container">
        <a className="navbar-brand" href="landing.html">
          DevConnector
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="profiles.html">
                Developers
              </a>
            </li>
          </ul>
          {isAuthenticated ? LoggedInLinks : LoggedOutLink}
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = State => {
  return {
    auth: State.auth
  };
};
export default connect(mapStateToProps, { Logout, clearCurrentProfile })(
  Navbar
);
