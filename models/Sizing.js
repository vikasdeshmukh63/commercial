const mongoose = require('mongoose');

const sizingSchema = new mongoose.Schema({
  oppId: {
    type: String,
    required: [true, 'Opportunity ID is required'],
    ref: 'Summary'
  },
  environment: {
    type: String,
    required: [true, 'Environment is required'],
    enum: ['Production', 'Staging', 'Development', 'Testing', 'DR'],
    trim: true
  },
  usage: {
    type: String,
    required: [true, 'Usage is required'],
    trim: true
  },
  cores: {
    type: Number,
    required: [true, 'Cores is required'],
    min: 1
  },
  memory: {
    type: String,
    required: [true, 'Memory is required'],
    trim: true
  },
  os: {
    type: String,
    required: [true, 'OS is required'],
    trim: true
  },
  disk: {
    type: String,
    required: [true, 'Disk is required'],
    trim: true
  },
  nos: {
    type: Number,
    required: [true, 'Number of servers is required'],
    min: 1,
    default: 1
  },
  remarks: {
    type: String,
    trim: true
  },
  applicationName: {
    type: String,
    trim: true
  },
  expectedLoad: {
    type: String,
    trim: true
  },
  peakHours: {
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
sizingSchema.index({ oppId: 1, environment: 1 });

module.exports = mongoose.model('Sizing', sizingSchema);