const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection (connect once for serverless)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/easyhire', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection error:', err);
  }
};

// Routes
app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/jobs', require('../backend/routes/jobs'));
app.use('/api/resumes', require('../backend/routes/resumes'));
app.use('/api/users', require('../backend/routes/users'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EasyHire Tools API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      jobs: '/api/jobs',
      resumes: '/api/resumes',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

// Connect to database before handling requests
connectDB();

module.exports = app;
