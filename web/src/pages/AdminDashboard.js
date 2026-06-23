import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/');
    }
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, jobsRes, statsRes] = await Promise.all([
        fetch('/api/admin/users', { headers }),
        fetch('/api/admin/jobs', { headers }),
        fetch('/api/admin/stats', { headers }),
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (jobsRes.ok) setJobs(await jobsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        alert('User deleted successfully');
      }
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleApproveJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/jobs/${jobId}/approve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        loadDashboardData();
        alert('Job approved');
      }
    } catch (err) {
      alert('Failed to approve job');
    }
  };

  const handleRejectJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setJobs(jobs.filter((j) => j._id !== jobId));
        alert('Job rejected');
      }
    } catch (err) {
      alert('Failed to reject job');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title">
          <h1>⚙️ Admin Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-container">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </button>
            <button
              className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              💼 Jobs
            </button>
          </nav>
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <h2>Platform Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers || 0}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💼</div>
                  <div className="stat-info">
                    <h3>Total Jobs</h3>
                    <p className="stat-number">{stats.totalJobs || 0}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-info">
                    <h3>Pending Jobs</h3>
                    <p className="stat-number">{stats.pendingJobs || 0}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📄</div>
                  <div className="stat-info">
                    <h3>Total Resumes</h3>
                    <p className="stat-number">{stats.totalResumes || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-tab">
              <h2>Manage Users</h2>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>{user.role}</span>
                          </td>
                          <td>
                            <span className="status-badge active">Active</span>
                          </td>
                          <td>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="jobs-tab">
              <h2>Manage Jobs</h2>
              {loading ? (
                <p>Loading jobs...</p>
              ) : (
                <div className="jobs-list">
                  {jobs.map((job) => (
                    <div key={job._id} className="job-item">
                      <div className="job-info">
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <div className="job-meta">
                          <span>📍 {job.location}</span>
                          <span>💰 {job.salary}</span>
                        </div>
                      </div>
                      <div className="job-actions">
                        <button
                          className="btn-approve"
                          onClick={() => handleApproveJob(job._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleRejectJob(job._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
