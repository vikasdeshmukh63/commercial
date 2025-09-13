const express = require('express');
const Commercial = require('../models/Commercial');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all commercial items by oppId
// @route   GET /api/commercial/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const commercial = await Commercial.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ srNo: 1 });

    // Calculate totals
    const totalMRC = commercial.reduce((sum, item) => sum + item.monthlyPay, 0);
    const totalOTC = commercial.reduce((sum, item) => sum + item.otc, 0);

    // Update summary totals
    await Summary.findOneAndUpdate(
      { oppId: req.params.oppId },
      { totalMRC, totalOTC }
    );

    res.status(200).json({
      success: true,
      count: commercial.length,
      data: commercial,
      totals: { totalMRC, totalOTC }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get single commercial item
// @route   GET /api/commercial/:oppId/:id
// @access  Private
router.get('/:oppId/:id', protect, canView, async (req, res) => {
  try {
    const commercial = await Commercial.findOne({
      _id: req.params.id,
      oppId: req.params.oppId
    })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!commercial) {
      return res.status(404).json({
        success: false,
        message: 'Commercial item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: commercial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new commercial item
// @route   POST /api/commercial/:oppId
// @access  Private (Admin/Partner)
router.post('/:oppId', protect, canEdit, async (req, res) => {
  try {
    // Check if summary exists
    const summary = await Summary.findOne({ oppId: req.params.oppId });
    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found for this opportunity'
      });
    }

    // Get next serial number
    const lastItem = await Commercial.findOne({ oppId: req.params.oppId })
      .sort({ srNo: -1 });
    const nextSrNo = lastItem ? lastItem.srNo + 1 : 1;

    req.body.oppId = req.params.oppId;
    req.body.srNo = nextSrNo;
    req.body.createdBy = req.user.id;
    
    const commercial = await Commercial.create(req.body);

    res.status(201).json({
      success: true,
      data: commercial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update commercial item
// @route   PUT /api/commercial/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const commercial = await Commercial.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!commercial) {
      return res.status(404).json({
        success: false,
        message: 'Commercial item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: commercial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete commercial item
// @route   DELETE /api/commercial/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const commercial = await Commercial.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!commercial) {
      return res.status(404).json({
        success: false,
        message: 'Commercial item not found'
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

// @desc    Bulk create commercial items
// @route   POST /api/commercial/:oppId/bulk
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

    // Get next serial number
    const lastItem = await Commercial.findOne({ oppId: req.params.oppId })
      .sort({ srNo: -1 });
    let nextSrNo = lastItem ? lastItem.srNo + 1 : 1;

    // Prepare items for bulk insert
    const commercialItems = items.map(item => ({
      ...item,
      oppId: req.params.oppId,
      srNo: nextSrNo++,
      createdBy: req.user.id
    }));

    const commercial = await Commercial.insertMany(commercialItems);

    res.status(201).json({
      success: true,
      count: commercial.length,
      data: commercial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;