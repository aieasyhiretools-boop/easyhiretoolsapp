const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Job = require('../models/Job');
const Resume = require('../models/Resume');

// Middleware to check admin
const adminAuth = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all jobs (pending)
router.get('/jobs', adminAuth, async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'pending' }).populate('postedBy', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve job
router.put('/jobs/:id/approve', adminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete job
router.delete('/jobs/:id', adminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get platform statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalJobs, pendingJobs, totalResumes] = await Promise.all([
      User.countDocuments({}),
      Job.countDocuments({}),
      Job.countDocuments({ status: 'pending' }),
      Resume.countDocuments({}),
    ]);

    res.json({
      totalUsers,
      totalJobs,
      pendingJobs,
      totalResumes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
