const express = require('express');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const Summary = require('../models/Summary');
const Commercial = require('../models/Commercial');
const DC = require('../models/DC');
const DRSite = require('../models/DRSite');
const Sizing = require('../models/Sizing');
const Query = require('../models/Query');
const RACI = require('../models/RACI');
const DiscountNote = require('../models/DiscountNote');
const { protect, canView } = require('../middleware/auth');

const router = express.Router();

// @desc    Export data to Excel
// @route   GET /api/export/:oppId/excel
// @access  Private
router.get('/:oppId/excel', protect, canView, async (req, res) => {
  try {
    const oppId = req.params.oppId;

    // Fetch all data
    const summary = await Summary.findOne({ oppId }).populate('createdBy', 'name');
    const commercial = await Commercial.find({ oppId });
    const dc = await DC.find({ oppId });
    const drsite = await DRSite.find({ oppId });
    const sizing = await Sizing.find({ oppId });
    const queries = await Query.find({ oppId });
    const raci = await RACI.find({ oppId });
    const discountNotes = await DiscountNote.find({ oppId });

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Summary sheet
    const summaryData = [
      ['Customer Name', summary.customerName],
      ['Partner Name', summary.partnerName],
      ['Date', summary.date.toDateString()],
      ['Opportunity ID', summary.oppId],
      ['Status', summary.status],
      ['Total MRC', summary.totalMRC],
      ['Total OTC', summary.totalOTC]
    ];
    const summaryWS = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWS, 'Summary');

    // Commercial sheet
    if (commercial.length > 0) {
      const commercialData = [
        ['Sr. No', 'Item', 'Monthly Pay', 'OTC', 'Category', 'Description']
      ];
      commercial.forEach(item => {
        commercialData.push([
          item.srNo,
          item.item,
          item.monthlyPay,
          item.otc,
          item.category,
          item.description || ''
        ]);
      });
      const commercialWS = XLSX.utils.aoa_to_sheet(commercialData);
      XLSX.utils.book_append_sheet(wb, commercialWS, 'Commercial');
    }

    // DC sheet
    if (dc.length > 0) {
      const dcData = [
        ['Server Name', 'Environment', 'Hosting Components', 'Unit', 'Cost/Unit', 'Quantity', 'MRC', 'OTC', 'Location', 'vCores', 'RAM', 'Storage', 'OS', 'Database']
      ];
      dc.forEach(item => {
        dcData.push([
          item.serverName || 'Unnamed Server',
          item.environment,
          item.hostingComponents,
          item.unit,
          item.costPerUnit,
          item.quantity,
          item.mrc * item.quantity,
          item.otc * item.quantity,
          item.location,
          item.specs?.vCores || '',
          item.specs?.ram || '',
          item.specs?.hdd || '',
          item.specs?.os || '',
          item.specs?.db || ''
        ]);
      });
      
      // Add totals row
      const totalMRC = dc.reduce((sum, item) => sum + (item.mrc * item.quantity), 0);
      const totalOTC = dc.reduce((sum, item) => sum + (item.otc * item.quantity), 0);
      dcData.push(['', '', '', '', '', 'TOTAL:', totalMRC, totalOTC, '', '', '', '', '', '']);
      
      const dcWS = XLSX.utils.aoa_to_sheet(dcData);
      XLSX.utils.book_append_sheet(wb, dcWS, 'Data Center');
    }

    // DR Site sheet
    if (drsite.length > 0) {
      const drsiteData = [
        ['Server Name', 'DR Environment', 'DR Location', 'RPO', 'RTO', 'Hosting Components', 'Unit', 'Cost/Unit', 'Quantity', 'MRC', 'OTC', 'vCores', 'RAM', 'Storage', 'OS', 'Database']
      ];
      drsite.forEach(item => {
        drsiteData.push([
          item.serverName || 'Unnamed DR Server',
          item.environment,
          item.drLocation,
          item.rpoRto?.rpo || '',
          item.rpoRto?.rto || '',
          item.hostingComponents,
          item.unit,
          item.costPerUnit,
          item.quantity,
          item.mrc * item.quantity,
          item.otc * item.quantity,
          item.specs?.vCores || '',
          item.specs?.ram || '',
          item.specs?.hdd || '',
          item.specs?.os || '',
          item.specs?.db || ''
        ]);
      });
      
      // Add totals row
      const totalMRC = drsite.reduce((sum, item) => sum + (item.mrc * item.quantity), 0);
      const totalOTC = drsite.reduce((sum, item) => sum + (item.otc * item.quantity), 0);
      drsiteData.push(['', '', '', '', '', '', '', '', 'TOTAL:', totalMRC, totalOTC, '', '', '', '', '']);
      
      const drsiteWS = XLSX.utils.aoa_to_sheet(drsiteData);
      XLSX.utils.book_append_sheet(wb, drsiteWS, 'DR Site');
    }

    // Generate filename
    const filename = `KPDCL_${oppId}_${Date.now()}.xlsx`;

    // Set headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Write to response
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.send(buffer);

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Export data to PDF
// @route   GET /api/export/:oppId/pdf
// @access  Private
router.get('/:oppId/pdf', protect, canView, async (req, res) => {
  try {
    const oppId = req.params.oppId;

    // Fetch summary data
    const summary = await Summary.findOne({ oppId }).populate('createdBy', 'name');
    const commercial = await Commercial.find({ oppId });

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: 'Summary not found'
      });
    }

    // Create PDF document
    const doc = new PDFDocument();
    
    // Set headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=KPDCL_${oppId}_${Date.now()}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content
    doc.fontSize(20).text('KPDCL Commercial Report', 50, 50);
    doc.fontSize(12);

    // Summary section
    doc.text(`Customer Name: ${summary.customerName}`, 50, 100);
    doc.text(`Partner Name: ${summary.partnerName}`, 50, 120);
    doc.text(`Date: ${summary.date.toDateString()}`, 50, 140);
    doc.text(`Opportunity ID: ${summary.oppId}`, 50, 160);
    doc.text(`Status: ${summary.status}`, 50, 180);
    doc.text(`Total MRC: ₹${summary.totalMRC.toLocaleString()}`, 50, 200);
    doc.text(`Total OTC: ₹${summary.totalOTC.toLocaleString()}`, 50, 220);

    // Commercial items
    if (commercial.length > 0) {
      doc.text('Commercial Items:', 50, 260);
      let yPos = 280;
      
      commercial.forEach((item, index) => {
        if (yPos > 700) {
          doc.addPage();
          yPos = 50;
        }
        doc.text(`${item.srNo}. ${item.item} - MRC: ₹${item.monthlyPay}, OTC: ₹${item.otc}`, 50, yPos);
        yPos += 20;
      });
    }

    // Finalize PDF
    doc.end();

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;