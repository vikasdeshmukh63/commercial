const express = require('express');
const DRSite = require('../models/DRSite');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all DR Site items by oppId
// @route   GET /api/drsite/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const drsite = await DRSite.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    // Calculate totals
    const totalMRC = drsite.reduce((sum, item) => sum + (item.mrc * item.quantity), 0);
    const totalOTC = drsite.reduce((sum, item) => sum + (item.otc * item.quantity), 0);

    res.status(200).json({
      success: true,
      count: drsite.length,
      data: drsite,
      totals: { totalMRC, totalOTC }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single DR Site item
// @route   GET /api/drsite/:oppId/:id
// @access  Private
router.get('/:oppId/:id', protect, canView, async (req, res) => {
  try {
    const drsite = await DRSite.findOne({
      _id: req.params.id,
      oppId: req.params.oppId
    })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!drsite) {
      return res.status(404).json({
        success: false,
        message: 'DR Site item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: drsite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new DR Site item
// @route   POST /api/drsite/:oppId
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
    
    const drsite = await DRSite.create(req.body);

    res.status(201).json({
      success: true,
      data: drsite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update DR Site item
// @route   PUT /api/drsite/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const drsite = await DRSite.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!drsite) {
      return res.status(404).json({
        success: false,
        message: 'DR Site item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: drsite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete DR Site item
// @route   DELETE /api/drsite/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const drsite = await DRSite.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!drsite) {
      return res.status(404).json({
        success: false,
        message: 'DR Site item not found'
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

// @desc    Bulk create DR Site items
// @route   POST /api/drsite/:oppId/bulk
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
    const drsiteItems = items.map(item => ({
      ...item,
      oppId: req.params.oppId,
      createdBy: req.user.id
    }));

    const drsite = await DRSite.insertMany(drsiteItems);

    res.status(201).json({
      success: true,
      count: drsite.length,
      data: drsite
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;