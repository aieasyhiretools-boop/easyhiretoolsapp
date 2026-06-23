import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Resumes from './pages/Resumes';
import RoleSelect from './pages/RoleSelect';
import CandidateLogin from './pages/CandidateLogin';
import EmployerLogin from './pages/EmployerLogin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/candidate-login" element={isAuthenticated ? <Navigate to="/jobs" /> : <CandidateLogin onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/employer-login" element={isAuthenticated ? <Navigate to="/post-job" /> : <EmployerLogin onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/admin-login" element={isAuthenticated ? <Navigate to="/admin-dashboard" /> : <AdminLogin onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/jobs" /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/jobs" /> : <Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/post-job" element={isAuthenticated ? <PostJob /> : <Navigate to="/employer-login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/candidate-login" />} />
            <Route path="/resumes" element={isAuthenticated ? <Resumes /> : <Navigate to="/candidate-login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
