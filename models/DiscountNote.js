const mongoose = require('mongoose');

const discountNoteSchema = new mongoose.Schema({
  oppId: {
    type: String,
    required: [true, 'Opportunity ID is required'],
    ref: 'Summary'
  },
  note: {
    type: String,
    required: [true, 'Note is required'],
    trim: true
  },
  discountType: {
    type: String,
    enum: ['Percentage', 'Fixed Amount', 'Volume Discount', 'Early Bird', 'Other'],
    default: 'Other'
  },
  discountValue: {
    type: Number,
    min: 0
  },
  applicableOn: {
    type: String,
    enum: ['MRC', 'OTC', 'Both'],
    default: 'Both'
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validTo: {
    type: Date
  },
  approvalRequired: {
    type: Boolean,
    default: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending Approval', 'Approved', 'Rejected'],
    default: 'Draft'
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
discountNoteSchema.index({ oppId: 1, status: 1 });

module.exports = mongoose.model('DiscountNote', discountNoteSchema);