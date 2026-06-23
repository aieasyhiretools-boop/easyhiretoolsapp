import React, { useState, useEffect } from 'react';
import { resumeService } from '../services/api';
import './Resumes.css';

function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await resumeService.getResume();
        setResumes(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resumeService.saveResume(formData);
      alert('Resume saved successfully!');
      setShowForm(false);
      setFormData({ title: '', content: '' });
      // Refresh resumes
      const response = await resumeService.getResume();
      setResumes(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError('Failed to save resume.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeService.deleteResume();
        alert('Resume deleted successfully!');
        setResumes(resumes.filter(r => r._id !== id));
      } catch (err) {
        setError('Failed to delete resume.');
      }
    }
  };

  if (loading) return <div className="container"><p>Loading resumes...</p></div>;

  return (
    <div className="container">
      <div className="resumes-header">
        <h1>My Resumes</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : '+ Add Resume'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="resume-form">
          <div className="form-group">
            <label>Resume Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Resume Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Save Resume</button>
        </form>
      )}

      {resumes.length === 0 ? (
        <p className="no-resumes">No resumes yet. Create your first one!</p>
      ) : (
        <div className="resumes-list">
          {resumes.map((resume) => (
            <div key={resume._id} className="resume-card">
              <h3>{resume.title}</h3>
              <p className="resume-preview">{resume.content.substring(0, 200)}...</p>
              <div className="resume-actions">
                <button className="btn-edit">Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(resume._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resumes;
