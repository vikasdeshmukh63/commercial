import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { getSummaryByOppId } from '../store/slices/summarySlice';
import axios from 'axios';

function Discount() {
  const { oppId } = useParams();
  const dispatch = useDispatch();
  const { currentSummary } = useSelector((state) => state.summary);
  const { user } = useSelector((state) => state.auth);

  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [formData, setFormData] = useState({
    note: '',
    discountType: 'Percentage',
    discountValue: '',
    applicableOn: 'Both',
    validFrom: new Date().toISOString().split('T')[0],
    validTo: '',
    approvalRequired: true,
  });

  useEffect(() => {
    if (oppId) {
      dispatch(getSummaryByOppId(oppId));
      fetchDiscounts();
    }
  }, [dispatch, oppId]);

  const fetchDiscounts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/discount/${oppId}`);
      setDiscounts(response.data.data || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch discounts');
    } finally {
      setIsLoading(false);
    }
  };

  const canEdit = user?.role === 'Admin' || user?.role === 'Partner';
  const canApprove = user?.role === 'Admin';

  const handleOpen = (discount = null) => {
    if (discount) {
      setEditMode(true);
      setSelectedDiscount(discount);
      setFormData({
        note: discount.note,
        discountType: discount.discountType,
        discountValue: discount.discountValue?.toString() || '',
        applicableOn: discount.applicableOn,
        validFrom: new Date(discount.validFrom).toISOString().split('T')[0],
        validTo: discount.validTo ? new Date(discount.validTo).toISOString().split('T')[0] : '',
        approvalRequired: discount.approvalRequired,
      });
    } else {
      setEditMode(false);
      setSelectedDiscount(null);
      setFormData({
        note: '',
        discountType: 'Percentage',
        discountValue: '',
        applicableOn: 'Both',
        validFrom: new Date().toISOString().split('T')[0],
        validTo: '',
        approvalRequired: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedDiscount(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const discountData = {
        ...formData,
        discountValue: parseFloat(formData.discountValue) || 0,
        validTo: formData.validTo || null,
      };

      if (editMode) {
        await axios.put(`/discount/${oppId}/${selectedDiscount._id}`, discountData);
      } else {
        await axios.post(`/discount/${oppId}`, discountData);
      }
      
      handleClose();
      fetchDiscounts();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save discount');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      try {
        await axios.delete(`/discount/${oppId}/${id}`);
        fetchDiscounts();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete discount');
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/discount/${oppId}/${id}/approve`);
      fetchDiscounts();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to approve discount');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending Approval':
        return 'warning';
      case 'Rejected':
        return 'error';
      case 'Draft':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDiscountValue = (discount) => {
    if (discount.discountType === 'Percentage') {
      return `${discount.discountValue}%`;
    } else {
      return formatCurrency(discount.discountValue);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4">Discount Management</Typography>
          {currentSummary && (
            <Typography variant="subtitle1" color="textSecondary">
              {currentSummary.customerName} - {currentSummary.oppId}
            </Typography>
          )}
        </Box>
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Add Discount
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Discount Note</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Applicable On</TableCell>
                  <TableCell>Valid From</TableCell>
                  <TableCell>Valid To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discounts?.map((discount) => (
                  <TableRow key={discount._id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {discount.note}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={discount.discountType} size="small" />
                    </TableCell>
                    <TableCell>{formatDiscountValue(discount)}</TableCell>
                    <TableCell>{discount.applicableOn}</TableCell>
                    <TableCell>
                      {new Date(discount.validFrom).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {discount.validTo 
                        ? new Date(discount.validTo).toLocaleDateString() 
                        : 'No expiry'
                      }
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={discount.status}
                        color={getStatusColor(discount.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {canEdit && (
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(discount)}
                          title="Edit"
                        >
                          <Edit />
                        </IconButton>
                      )}
                      {canApprove && discount.status === 'Pending Approval' && (
                        <IconButton
                          size="small"
                          onClick={() => handleApprove(discount._id)}
                          title="Approve"
                          color="success"
                        >
                          <CheckCircle />
                        </IconButton>
                      )}
                      {canEdit && (
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(discount._id)}
                          title="Delete"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {(!discounts || discounts.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography color="textSecondary">
                        No discounts found. Add discounts to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Discount' : 'Add Discount'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="note"
                  label="Discount Note"
                  fullWidth
                  variant="outlined"
                  value={formData.note}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  placeholder="Describe the reason for this discount..."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Discount Type</InputLabel>
                  <Select
                    name="discountType"
                    value={formData.discountType}
                    label="Discount Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="Percentage">Percentage</MenuItem>
                    <MenuItem value="Fixed Amount">Fixed Amount</MenuItem>
                    <MenuItem value="Volume Discount">Volume Discount</MenuItem>
                    <MenuItem value="Early Bird">Early Bird</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="discountValue"
                  label={formData.discountType === 'Percentage' ? 'Discount (%)' : 'Discount Amount (₹)'}
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.discountValue}
                  onChange={handleChange}
                  required
                  inputProps={{ 
                    min: 0, 
                    step: formData.discountType === 'Percentage' ? 0.1 : 1,
                    max: formData.discountType === 'Percentage' ? 100 : undefined
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Applicable On</InputLabel>
                  <Select
                    name="applicableOn"
                    value={formData.applicableOn}
                    label="Applicable On"
                    onChange={handleChange}
                  >
                    <MenuItem value="MRC">MRC Only</MenuItem>
                    <MenuItem value="OTC">OTC Only</MenuItem>
                    <MenuItem value="Both">Both MRC & OTC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="validFrom"
                  label="Valid From"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={formData.validFrom}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="validTo"
                  label="Valid To (Optional)"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={formData.validTo}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Discount;