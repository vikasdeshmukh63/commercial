const express = require('express');
const RACI = require('../models/RACI');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all RACI items by oppId
// @route   GET /api/raci/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const raci = await RACI.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ phase: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: raci.length,
      data: raci
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new RACI item
// @route   POST /api/raci/:oppId
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
    
    const raci = await RACI.create(req.body);

    res.status(201).json({
      success: true,
      data: raci
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update RACI item
// @route   PUT /api/raci/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const raci = await RACI.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!raci) {
      return res.status(404).json({
        success: false,
        message: 'RACI item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: raci
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete RACI item
// @route   DELETE /api/raci/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const raci = await RACI.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!raci) {
      return res.status(404).json({
        success: false,
        message: 'RACI item not found'
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