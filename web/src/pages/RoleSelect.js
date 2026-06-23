import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-select">
      <div className="role-container">
        <h1>Welcome to EasyHire Tools</h1>
        <p>Choose your role to continue</p>

        <div className="role-cards">
          <div className="role-card candidate-card" onClick={() => navigate('/candidate-login')}>
            <div className="role-icon">👤</div>
            <h3>Job Seeker</h3>
            <p>Find your dream job and manage your resume</p>
            <button className="role-btn">Continue as Candidate</button>
          </div>

          <div className="role-card employer-card" onClick={() => navigate('/employer-login')}>
            <div className="role-icon">💼</div>
            <h3>Employer</h3>
            <p>Post jobs and find qualified candidates</p>
            <button className="role-btn">Continue as Employer</button>
          </div>

          <div className="role-card admin-card" onClick={() => navigate('/admin-login')}>
            <div className="role-icon">⚙️</div>
            <h3>Super Admin</h3>
            <p>Manage platform and users</p>
            <button className="role-btn">Continue as Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
