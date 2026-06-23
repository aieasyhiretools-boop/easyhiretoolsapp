import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Easy_Hire_Tools_logo.png';
import './AuthPages.css';

function CandidateLogin({ onLoginSuccess }) {
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
        body: JSON.stringify({ email, password, role: 'candidate' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', 'candidate');

      onLoginSuccess();
      navigate('/jobs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page candidate-auth">
      <div className="auth-left">
        <div className="auth-content">
          <div className="auth-logo">
            <img src={logo} alt="EasyHire Tools" />
          </div>
          <h1>Welcome Back, Job Seeker!</h1>
          <p>Login to explore thousands of job opportunities</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
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
              Don't have an account? <Link to="/register?role=candidate">Sign up here</Link>
            </p>
            <p>
              <Link to="/">Back to home</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-banner">
          <h2>Find Your Dream Job</h2>
          <p>Browse thousands of job openings and apply to the positions that match your skills</p>
          <div className="banner-features">
            <div className="feature">✓ Easy job search</div>
            <div className="feature">✓ Quick application</div>
            <div className="feature">✓ Resume management</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateLogin;
