const express = require('express');
const Query = require('../models/Query');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all queries by oppId
// @route   GET /api/queries/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const queries = await Query.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ srNo: 1 });

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new query
// @route   POST /api/queries/:oppId
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

    // Get next serial number
    const lastQuery = await Query.findOne({ oppId: req.params.oppId })
      .sort({ srNo: -1 });
    const nextSrNo = lastQuery ? lastQuery.srNo + 1 : 1;

    req.body.oppId = req.params.oppId;
    req.body.srNo = nextSrNo;
    req.body.createdBy = req.user.id;
    
    const query = await Query.create(req.body);

    res.status(201).json({
      success: true,
      data: query
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update query
// @route   PUT /api/queries/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const query = await Query.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.status(200).json({
      success: true,
      data: query
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete query
// @route   DELETE /api/queries/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const query = await Query.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
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