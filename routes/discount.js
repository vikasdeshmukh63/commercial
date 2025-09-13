const express = require('express');
const DiscountNote = require('../models/DiscountNote');
const Summary = require('../models/Summary');
const { protect, canEdit, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all discount notes by oppId
// @route   GET /api/discount/:oppId
// @access  Private
router.get('/:oppId', protect, canView, async (req, res) => {
  try {
    const discountNotes = await DiscountNote.find({ oppId: req.params.oppId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: discountNotes.length,
      data: discountNotes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create new discount note
// @route   POST /api/discount/:oppId
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
    
    const discountNote = await DiscountNote.create(req.body);

    res.status(201).json({
      success: true,
      data: discountNote
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update discount note
// @route   PUT /api/discount/:oppId/:id
// @access  Private (Admin/Partner)
router.put('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    req.body.updatedBy = req.user.id;
    
    const discountNote = await DiscountNote.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!discountNote) {
      return res.status(404).json({
        success: false,
        message: 'Discount note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: discountNote
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Approve discount note
// @route   PUT /api/discount/:oppId/:id/approve
// @access  Private (Admin only)
router.put('/:oppId/:id/approve', protect, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can approve discount notes'
      });
    }

    const discountNote = await DiscountNote.findOneAndUpdate(
      { _id: req.params.id, oppId: req.params.oppId },
      {
        status: 'Approved',
        approvedBy: req.user.id,
        approvalDate: new Date(),
        updatedBy: req.user.id
      },
      { new: true, runValidators: true }
    );

    if (!discountNote) {
      return res.status(404).json({
        success: false,
        message: 'Discount note not found'
      });
    }

    res.status(200).json({
      success: true,
      data: discountNote
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Delete discount note
// @route   DELETE /api/discount/:oppId/:id
// @access  Private (Admin/Partner)
router.delete('/:oppId/:id', protect, canEdit, async (req, res) => {
  try {
    const discountNote = await DiscountNote.findOneAndDelete({
      _id: req.params.id,
      oppId: req.params.oppId
    });

    if (!discountNote) {
      return res.status(404).json({
        success: false,
        message: 'Discount note not found'
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