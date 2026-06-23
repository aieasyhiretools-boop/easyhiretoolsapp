const express = require('express');
const Resume = require('../models/Resume');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user's resume
router.get('/user/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user's resume
router.get('/', authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create/Update resume
router.post('/', authMiddleware, async (req, res) => {
  try {
    let resume = await Resume.findOne({ userId: req.userId });

    if (resume) {
      Object.assign(resume, req.body);
      await resume.save();
    } else {
      resume = new Resume({
        userId: req.userId,
        ...req.body,
      });
      await resume.save();
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete resume
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Resume.findOneAndDelete({ userId: req.userId });
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
