import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

export default function Header(props) {
  const activeStyle = {
    backgroundColor: "rgba(106, 107, 110, 0.15)",
    color: "#010202ff",
    fontWeight: 600,
    fontSize: "1.05rem",
    borderRadius: "6px",
    padding: "6px 12px",
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">{props.title}</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                end
              >
                Home
              </NavLink>

            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                About
              </NavLink>

            </li>
            <li className="nav-item">
              <NavLink
                to="/mytodos"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                My Todos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/users"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Users
              </NavLink>
            </li>
          </ul>
          {props.searchBar && (
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  title: "Your title here"
}

Header.propTypes = {
  title: PropTypes.string
}
