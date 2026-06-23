import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';
import './JobDetail.css';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getJob(id);
        setJob(response.data);
      } catch (err) {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await jobService.applyJob(id);
      setApplied(true);
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Failed to apply for the job. Please make sure you are logged in.');
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;
  if (!job) return <div className="container"><p>Job not found</p></div>;

  return (
    <div className="container">
      <button onClick={() => navigate('/jobs')} className="back-btn">← Back to Jobs</button>
      <div className="job-detail">
        <div className="job-header">
          <h1>{job.title}</h1>
          <p className="company-detail">{job.company}</p>
        </div>
        <div className="job-info">
          <div className="info-item">
            <span className="label">Location:</span>
            <span>{job.location}</span>
          </div>
          <div className="info-item">
            <span className="label">Salary:</span>
            <span>${job.salary}</span>
          </div>
          <div className="info-item">
            <span className="label">Job Type:</span>
            <span>{job.jobType}</span>
          </div>
        </div>
        <div className="job-description">
          <h3>Description</h3>
          <p>{job.description}</p>
        </div>
        <button
          onClick={handleApply}
          disabled={applied}
          className={`apply-btn ${applied ? 'applied' : ''}`}
        >
          {applied ? '✓ Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}

export default JobDetail;
