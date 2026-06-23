const express = require('express');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' })
      .populate('postedBy', 'name company')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name company email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a job (employers only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.userType !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs' });
    }

    const job = new Job({
      ...req.body,
      postedBy: req.userId,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apply for a job
router.post('/:id/apply', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const applicantExists = job.applicants.find(
      app => app.userId.toString() === req.userId
    );
    if (applicantExists) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    job.applicants.push({
      userId: req.userId,
      appliedAt: new Date(),
    });

    await job.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update job (by poster)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
