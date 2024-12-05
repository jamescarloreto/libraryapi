import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';

const Main = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="brand-container flex-grow-1 text-center">
          <Link className="navbar-brand mx-auto" to="/">
            Library App
          </Link>
        </div>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Books</Link>
            </li>
            <li className="nav-item">
            </li>
            <li className="nav-item">
              <Link className="nav-link profile-link" to="/profile">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="profile-picture"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Main;
