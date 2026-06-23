import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Easy_Hire_Tools_logo.png';
import './Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data.slice(0, 6)); // Show first 6 jobs
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const jobCategories = [
    { name: 'IT & Software', icon: '💻', color: '#667eea' },
    { name: 'Sales & Marketing', icon: '📢', color: '#f093fb' },
    { name: 'Operations', icon: '⚙️', color: '#4facfe' },
    { name: 'BFSI', icon: '🏦', color: '#00f2fe' },
    { name: 'Data Science', icon: '📊', color: '#43e97b' },
    { name: 'HR', icon: '👥', color: '#fa709a' },
  ];

  const companies = [
    { name: 'TechCorp', logo: '🏢' },
    { name: 'InnovateLabs', logo: '🧪' },
    { name: 'DataFlow', logo: '📈' },
    { name: 'CloudWorks', logo: '☁️' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-banner">
        <div className="container hero-content">
          <div className="hero-left">
            <img src={logo} alt="EasyHire Tools" className="hero-logo" />
            <h1>Search Your Dream Job</h1>
            <p>Discover 5 Lakh+ Job Opportunities</p>

            {/* Search Bar */}
            <div className="search-section">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Job title or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">Search Jobs</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
              <Link to="/role-select" className="btn btn-secondary">
                Post a Job
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <span>⭐ 4.5 Stars | 10M+ Downloads</span>
              <span>✓ Trusted by Top Companies</span>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-illustration">🎯</div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Categories Section */}
        <section className="categories-section">
          <h2>Explore Jobs by Category</h2>
          <div className="categories-grid">
            {jobCategories.map((cat, idx) => (
              <div key={idx} className="category-card" style={{ borderTopColor: cat.color }}>
                <div className="category-icon" style={{ backgroundColor: cat.color + '20' }}>
                  {cat.icon}
                </div>
                <h3>{cat.name}</h3>
                <a href="/jobs" className="category-link">
                  View Jobs →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="featured-jobs-section">
          <div className="section-header">
            <h2>Latest Job Openings</h2>
            <Link to="/jobs" className="view-all-link">
              View All Jobs →
            </Link>
          </div>
          <div className="jobs-grid">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Link key={job._id} to={`/jobs/${job._id}`} className="job-card">
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="job-type">{job.jobType}</span>
                  </div>
                  <p className="job-company">{job.company}</p>
                  <div className="job-details">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                  <button className="job-apply-btn">View Details</button>
                </Link>
              ))
            ) : (
              <p>No jobs available</p>
            )}
          </div>
        </section>

        {/* Top Companies Section */}
        <section className="companies-section">
          <h2>Trusted by Top Companies</h2>
          <div className="companies-grid">
            {companies.map((company, idx) => (
              <div key={idx} className="company-card">
                <div className="company-logo">{company.logo}</div>
                <p>{company.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Job?</h2>
            <p>Join thousands of job seekers who have found their perfect match</p>
            <Link to="/jobs" className="btn btn-primary btn-large">
              Start Searching Now
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose EasyHire Tools?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Easy Job Search</h3>
              <p>Browse thousands of job listings with advanced filters</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Application</h3>
              <p>Apply to jobs with a single click</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Resume Management</h3>
              <p>Manage and update your resume easily</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Job Alerts</h3>
              <p>Get notified about matching job opportunities</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
