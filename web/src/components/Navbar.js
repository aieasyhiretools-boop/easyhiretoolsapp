import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Easy_Hire_Tools_logo.png';
import './Navbar.css';

function Navbar({ isAuthenticated, user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="EasyHire Tools" className="logo-img" />
        </Link>
        <div className="navbar-menu">
          <Link to="/jobs" className="nav-link">Jobs</Link>
          {isAuthenticated && (
            <>
              <Link to="/post-job" className="nav-link">Post Job</Link>
              <Link to="/resumes" className="nav-link">Resumes</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <span className="nav-user">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
