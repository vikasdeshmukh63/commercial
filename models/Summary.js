const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  partnerName: {
    type: String,
    required: [true, 'Partner name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  oppId: {
    type: String,
    required: [true, 'Opportunity ID is required'],
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Draft', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Draft'
  },
  totalMRC: {
    type: Number,
    default: 0
  },
  totalOTC: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Summary', summarySchema);