const mongoose = require('mongoose');

const raciSchema = new mongoose.Schema({
  oppId: {
    type: String,
    required: [true, 'Opportunity ID is required'],
    ref: 'Summary'
  },
  activity: {
    type: String,
    required: [true, 'Activity is required'],
    trim: true
  },
  client: {
    type: String,
    enum: ['R', 'A', 'C', 'I', ''],
    default: ''
  },
  partner: {
    type: String,
    enum: ['R', 'A', 'C', 'I', ''],
    default: ''
  },
  esds: {
    type: String,
    enum: ['R', 'A', 'C', 'I', ''],
    default: ''
  },
  phase: {
    type: String,
    enum: ['Planning', 'Design', 'Implementation', 'Testing', 'Deployment', 'Support'],
    default: 'Planning'
  },
  category: {
    type: String,
    enum: ['Infrastructure', 'Application', 'Security', 'Network', 'Database', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
raciSchema.index({ oppId: 1, phase: 1 });

module.exports = mongoose.model('RACI', raciSchema);