const express = require('express');
const DC = require('../models/DC');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all DC items by oppId
// @route   GET /api/dc/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const dc = await DC.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    // Calculate totals
    const totalMRC = dc.reduce((sum, item) => sum + (item.mrc * item.quantity), 0);
    const totalOTC = dc.reduce((sum, item) => sum + (item.otc * item.quantity), 0);

    res.status(200).json({
      success: true,
      count: dc.length,
      data: dc,
      totals: { totalMRC, totalOTC }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single DC item
// @route   GET /api/dc/:oppId/:id
// @access  Private
router.get('/:oppId/:id', protect, canView, async (req, res) => {
  try {
    const dc = await DC.findOne({
      _id: req.params.id,
      oppId: req.params.oppId
    })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!dc) {
      return res.status(404).json({
        success: false,
        message: 'DC item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: dc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new DC item
// @route   POST /api/dc/:oppId
// @access  Private (Admin/Partner)
router.post('/:oppId', protect, canEdit, async (req, res) => {
  try {
    const summary = await Summary.findOne({ oppId: req.params.oppId });
    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found for this opportunity'
      });
    }

    req.body.oppId = req.params.oppId;
    req.body.createdBy = req.user.id;
    
    const dc = await DC.create(req.body);

    res.status(201).json({
      success: true,
      data: dc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update DC item
// @route   PUT /api/dc/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const dc = await DC.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!dc) {
      return res.status(404).json({
        success: false,
        message: 'DC item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: dc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete DC item
// @route   DELETE /api/dc/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const dc = await DC.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!dc) {
      return res.status(404).json({
        success: false,
        message: 'DC item not found'
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

// @desc    Bulk create DC items
// @route   POST /api/dc/:oppId/bulk
// @access  Private (Admin/Partner)
router.post('/:oppId/bulk', protect, canEdit, async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    // Check if summary exists
    const summary = await Summary.findOne({ oppId: req.params.oppId });
    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found for this opportunity'
      });
    }

    // Prepare items for bulk insert
    const dcItems = items.map(item => ({
      ...item,
      oppId: req.params.oppId,
      createdBy: req.user.id
    }));

    const dc = await DC.insertMany(dcItems);

    res.status(201).json({
      success: true,
      count: dc.length,
      data: dc
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;