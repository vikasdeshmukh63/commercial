const mongoose = require('mongoose');

const commercialSchema = new mongoose.Schema({
  oppId: {
    type: String,
    required: [true, 'Opportunity ID is required'],
    ref: 'Summary'
  },
  srNo: {
    type: Number,
    required: true
  },
  item: {
    type: String,
    required: [true, 'Item is required'],
    trim: true
  },
  monthlyPay: {
    type: Number,
    required: [true, 'Monthly pay is required'],
    min: 0
  },
  otc: {
    type: Number,
    required: [true, 'OTC is required'],
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Infrastructure', 'Software', 'Services', 'Support', 'Other'],
    default: 'Other'
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
commercialSchema.index({ oppId: 1, srNo: 1 });

module.exports = mongoose.model('Commercial', commercialSchema);