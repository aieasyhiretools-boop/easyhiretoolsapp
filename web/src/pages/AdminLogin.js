import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Easy_Hire_Tools_logo.png';
import './AuthPages.css';

function AdminLogin({ onLoginSuccess }) {
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
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', 'admin');

      onLoginSuccess();
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin-auth">
      <div className="auth-left">
        <div className="auth-content">
          <div className="auth-logo">
            <img src={logo} alt="EasyHire Tools" />
          </div>
          <h1>Super Admin Login</h1>
          <p>Manage the EasyHire Tools platform</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
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
              <Link to="/">Back to home</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-right admin-right">
        <div className="auth-banner">
          <h2>Platform Management</h2>
          <p>Control and manage all users, jobs, and platform settings</p>
          <div className="banner-features">
            <div className="feature">✓ User management</div>
            <div className="feature">✓ Job moderation</div>
            <div className="feature">✓ Analytics & reports</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
