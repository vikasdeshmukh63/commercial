const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  oppId: {
    type: String,
    required: [true, 'Opportunity ID is required'],
    ref: 'Summary'
  },
  srNo: {
    type: Number,
    required: true
  },
  query: {
    type: String,
    required: [true, 'Query is required'],
    trim: true
  },
  response: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  category: {
    type: String,
    enum: ['Technical', 'Commercial', 'Legal', 'Process', 'Other'],
    default: 'Other'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Date
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
querySchema.index({ oppId: 1, srNo: 1 });
querySchema.index({ status: 1, priority: 1 });

module.exports = mongoose.model('Query', querySchema);