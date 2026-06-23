const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  summary: String,
  experience: [{
    jobTitle: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    graduationDate: Date,
  }],
  skills: [String],
  fileUrl: String,
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
