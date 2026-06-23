import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const logoUrl = `${process.env.PUBLIC_URL}/Easy_Hire_Tools_logo.png`;

  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          <img src={logoUrl} alt="EasyHire Tools" className="hero-logo" />
          <h1>Welcome to EasyHire Tools</h1>
          <p>Connect employers with talented candidates and manage resumes effortlessly</p>
          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
            <Link to="/register" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Post Jobs</h3>
            <p>Post job listings and find qualified candidates quickly and easily</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Manage Resumes</h3>
            <p>Upload and manage resumes in one central location</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Find Jobs</h3>
            <p>Browse available positions and apply to ones that match your skills</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Build Profile</h3>
            <p>Create a professional profile to showcase your experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
