const express = require('express');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all summaries
// @route   GET /api/summary
// @access  Private
router.get('/', protect, canView, async (req, res) => {
  try {
    const summaries = await Summary.find()
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: summaries.length,
      data: summaries
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single summary
// @route   GET /api/summary/:id
// @access  Private
router.get('/:id', protect, canView, async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get summary by oppId
// @route   GET /api/summary/opp/:oppId
// @access  Private
router.get('/opp/:oppId', protect, canView, async (req, res) => {
  try {
    const summary = await Summary.findOne({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new summary
// @route   POST /api/summary
// @access  Private (Admin/Partner)
router.post('/', protect, canEdit, async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    
    const summary = await Summary.create(req.body);

    res.status(201).json({
      success: true,
      data: summary
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Opportunity ID already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update summary
// @route   PUT /api/summary/:id
// @access  Private (Admin/Partner)
router.put('/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const summary = await Summary.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete summary
// @route   DELETE /api/summary/:id
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete summaries'
      });
    }

    const summary = await Summary.findByIdAndDelete(req.params.id);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get dashboard stats
// @route   GET /api/summary/stats/dashboard
// @access  Private
router.get('/stats/dashboard', protect, canView, async (req, res) => {
  try {
    const totalSummaries = await Summary.countDocuments();
    const activeSummaries = await Summary.countDocuments({ 
      status: { $in: ['Draft', 'In Progress'] } 
    });
    const completedSummaries = await Summary.countDocuments({ status: 'Completed' });
    
    const totalMRC = await Summary.aggregate([
      { $group: { _id: null, total: { $sum: '$totalMRC' } } }
    ]);
    
    const totalOTC = await Summary.aggregate([
      { $group: { _id: null, total: { $sum: '$totalOTC' } } }
    ]);

    const recentSummaries = await Summary.find()
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalSummaries,
        activeSummaries,
        completedSummaries,
        totalMRC: totalMRC[0]?.total || 0,
        totalOTC: totalOTC[0]?.total || 0,
        recentSummaries
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;