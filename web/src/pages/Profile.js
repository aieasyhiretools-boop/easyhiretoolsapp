import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import './Profile.css';

function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateProfile(formData);
      setProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div className="container"><p>Loading profile...</p></div>;

  return (
    <div className="container">
      <div className="profile-container">
        <h1>My Profile</h1>
        {error && <div className="error-message">{error}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(profile);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            {profile && (
              <>
                <div className="profile-field">
                  <span className="label">Name:</span>
                  <span>{profile.name}</span>
                </div>
                <div className="profile-field">
                  <span className="label">Email:</span>
                  <span>{profile.email}</span>
                </div>
                <div className="profile-field">
                  <span className="label">User Type:</span>
                  <span>{profile.userType}</span>
                </div>
                <div className="profile-field">
                  <span className="label">Bio:</span>
                  <span>{profile.bio || 'No bio added yet'}</span>
                </div>
              </>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
