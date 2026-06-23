import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password, userType) =>
    api.post('/auth/register', { name, email, password, userType }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const jobService = {
  getJobs: () => api.get('/jobs'),
  getJob: (id) => api.get(`/jobs/${id}`),
  postJob: (jobData) => api.post('/jobs', jobData),
  applyJob: (jobId) => api.post(`/jobs/${jobId}/apply`),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
};

export const resumeService = {
  getResume: () => api.get('/resumes'),
  getUserResume: (userId) => api.get(`/resumes/user/${userId}`),
  saveResume: (resumeData) => api.post('/resumes', resumeData),
  deleteResume: () => api.delete('/resumes'),
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

export default api;
