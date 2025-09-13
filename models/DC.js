const mongoose = require('mongoose');

const dcSchema = new mongoose.Schema({
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
  hostingComponents: {
    type: String,
    required: [true, 'Hosting components is required'],
    trim: true
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  },
  costPerUnit: {
    type: Number,
    required: [true, 'Cost per unit is required'],
    min: 0
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1,
    default: 1
  },
  mrc: {
    type: Number,
    required: [true, 'MRC is required'],
    min: 0
  },
  otc: {
    type: Number,
    required: [true, 'OTC is required'],
    min: 0
  },
  specs: {
    vCores: {
      type: Number,
      min: 1
    },
    ram: {
      type: String,
      trim: true
    },
    hdd: {
      type: String,
      trim: true
    },
    os: {
      type: String,
      trim: true
    },
    db: {
      type: String,
      trim: true
    }
  },
  serverName: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    enum: ['Primary DC', 'Secondary DC', 'Edge Location'],
    default: 'Primary DC'
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
dcSchema.index({ oppId: 1, environment: 1 });

module.exports = mongoose.model('DC', dcSchema);