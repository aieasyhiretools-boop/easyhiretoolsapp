import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../services/api';
import './Jobs.css';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getJobs();
        setJobs(response.data);
      } catch (err) {
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="container"><p>Loading jobs...</p></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;

  return (
    <div className="container">
      <div className="jobs-header">
        <h1>Available Jobs</h1>
        <Link to="/post-job" className="btn btn-primary">Post a Job</Link>
      </div>

      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs available at the moment.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <Link key={job._id} to={`/jobs/${job._id}`} className="job-card">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="location">{job.location}</p>
              <p className="description">{job.description.substring(0, 150)}...</p>
              <div className="job-meta">
                <span className="salary">${job.salary}</span>
                <span className="job-type">{job.jobType}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
