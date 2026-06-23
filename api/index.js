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
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/easyhire', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    isConnected = false;
  }
};

// JWT Authentication Middleware
const jwt = require('jsonwebtoken');

// Ensure DB connection before handling requests
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = decoded;
    } catch (err) {
      console.log('Token verification failed:', err.message);
    }
  }
  next();
});

// Routes
app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/jobs', require('../backend/routes/jobs'));
app.use('/api/resumes', require('../backend/routes/resumes'));
app.use('/api/users', require('../backend/routes/users'));
app.use('/api/admin', require('../backend/routes/admin'));

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
