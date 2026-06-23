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
  const [searchTerm, setSearchTerm] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/');
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setAdminInfo(user);
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

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      }
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      }
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
        alert('✅ User deleted successfully');
      }
    } catch (err) {
      alert('❌ Failed to delete user');
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
        alert('✅ Job approved');
      }
    } catch (err) {
      alert('❌ Failed to approve job');
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
        alert('✅ Job rejected');
      }
    } catch (err) {
      alert('❌ Failed to reject job');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title">
          <div className="header-content">
            <h1>⚙️ Super Admin Dashboard</h1>
            <p className="header-subtitle">Platform Management & Analytics</p>
          </div>
        </div>
        <div className="admin-header-right">
          <div className="admin-info">
            <span>👤 {adminInfo?.name || 'Admin'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <span className="nav-icon">👥</span>
              <span>Users ({users.length})</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              <span className="nav-icon">💼</span>
              <span>Jobs ({jobs.length})</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="support-box">
              <h4>🆘 Need Help?</h4>
              <p>Contact support team</p>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <h2>📈 Platform Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card total-users">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers || 0}</p>
                    <span className="stat-trend">↑ Platform Users</span>
                  </div>
                </div>
                <div className="stat-card total-jobs">
                  <div className="stat-icon">💼</div>
                  <div className="stat-info">
                    <h3>Total Jobs</h3>
                    <p className="stat-number">{stats.totalJobs || 0}</p>
                    <span className="stat-trend">↑ Job Postings</span>
                  </div>
                </div>
                <div className="stat-card pending-jobs">
                  <div className="stat-icon">📝</div>
                  <div className="stat-info">
                    <h3>Pending Jobs</h3>
                    <p className="stat-number">{stats.pendingJobs || 0}</p>
                    <span className="stat-trend">⏳ Need Approval</span>
                  </div>
                </div>
                <div className="stat-card total-resumes">
                  <div className="stat-icon">📄</div>
                  <div className="stat-info">
                    <h3>Total Resumes</h3>
                    <p className="stat-number">{stats.totalResumes || 0}</p>
                    <span className="stat-trend">📂 Submissions</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-actions">
                <div className="action-card">
                  <h3>🎯 Quick Actions</h3>
                  <div className="action-buttons">
                    <button className="action-btn" onClick={() => setActiveTab('users')}>
                      Manage Users
                    </button>
                    <button className="action-btn" onClick={() => setActiveTab('jobs')}>
                      Review Jobs
                    </button>
                    <button className="action-btn" onClick={() => loadDashboardData()}>
                      Refresh Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-tab">
              <div className="tab-header">
                <h2>👥 Manage Users</h2>
                <input
                  type="text"
                  placeholder="🔍 Search by name or email..."
                  className="search-box"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {loading ? (
                <p className="loading">Loading users...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="no-data">No users found</p>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <div className="user-name">
                              <span className="avatar">{user.name?.charAt(0)}</span>
                              {user.name}
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.userType}`}>
                              {user.userType === 'jobseeker' ? '👤 Candidate' : '🏢 Employer'}
                            </span>
                          </td>
                          <td>
                            <span className="type-badge">{user.userType}</span>
                          </td>
                          <td>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              🗑️ Delete
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
              <div className="tab-header">
                <h2>💼 Manage Jobs</h2>
                <input
                  type="text"
                  placeholder="🔍 Search by title or company..."
                  className="search-box"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {loading ? (
                <p className="loading">Loading jobs...</p>
              ) : filteredJobs.length === 0 ? (
                <p className="no-data">No pending jobs to review</p>
              ) : (
                <div className="jobs-list">
                  {filteredJobs.map((job) => (
                    <div key={job._id} className="job-item">
                      <div className="job-info">
                        <h3>{job.title}</h3>
                        <p className="company-name">🏢 {job.company}</p>
                        <div className="job-meta">
                          <span className="meta-item">📍 {job.location}</span>
                          <span className="meta-item">💰 {job.salary}</span>
                          <span className="meta-item">⏱️ {job.experience}</span>
                        </div>
                        <p className="job-description">{job.description?.substring(0, 100)}...</p>
                      </div>
                      <div className="job-actions">
                        <button
                          className="btn-approve"
                          onClick={() => handleApproveJob(job._id)}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleRejectJob(job._id)}
                        >
                          ❌ Reject
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
