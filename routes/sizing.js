const express = require('express');
const Sizing = require('../models/Sizing');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all sizing items by oppId
// @route   GET /api/sizing/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const sizing = await Sizing.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sizing.length,
      data: sizing
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new sizing item
// @route   POST /api/sizing/:oppId
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
    
    const sizing = await Sizing.create(req.body);

    res.status(201).json({
      success: true,
      data: sizing
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update sizing item
// @route   PUT /api/sizing/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const sizing = await Sizing.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!sizing) {
      return res.status(404).json({
        success: false,
        message: 'Sizing item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: sizing
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete sizing item
// @route   DELETE /api/sizing/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const sizing = await Sizing.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!sizing) {
      return res.status(404).json({
        success: false,
        message: 'Sizing item not found'
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

module.exports = router;