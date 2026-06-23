import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Easy_Hire_Tools_logo.png';
import './AuthPages.css';

function EmployerLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'employer' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', 'employer');

      onLoginSuccess();
      navigate('/post-job');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page employer-auth">
      <div className="auth-left">
        <div className="auth-content">
          <div className="auth-logo">
            <img src={logo} alt="EasyHire Tools" />
          </div>
          <h1>Welcome, Employer!</h1>
          <p>Login to post jobs and find talented candidates</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Company Email</label>
              <input
                type="email"
                placeholder="company@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register?role=employer">Sign up here</Link>
            </p>
            <p>
              <Link to="/">Back to home</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-right employer-right">
        <div className="auth-banner">
          <h2>Hire Top Talent</h2>
          <p>Post your job openings and connect with qualified candidates</p>
          <div className="banner-features">
            <div className="feature">✓ Easy job posting</div>
            <div className="feature">✓ Access to resume pool</div>
            <div className="feature">✓ Candidate tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerLogin;
