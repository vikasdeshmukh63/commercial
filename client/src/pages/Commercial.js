import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  GetApp,
} from '@mui/icons-material';
import {
  getCommercialItems,
  createCommercialItem,
  updateCommercialItem,
  deleteCommercialItem,
  reset,
} from '../store/slices/commercialSlice';
import { getSummaryByOppId } from '../store/slices/summarySlice';

function Commercial() {
  const { oppId } = useParams();
  const dispatch = useDispatch();
  const { items, totals, isLoading, error } = useSelector((state) => state.commercial);
  const { currentSummary } = useSelector((state) => state.summary);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    item: '',
    monthlyPay: '',
    otc: '',
    description: '',
    category: 'Other',
  });

  useEffect(() => {
    if (oppId) {
      dispatch(getCommercialItems(oppId));
      dispatch(getSummaryByOppId(oppId));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, oppId]);

  const canEdit = user?.role === 'Admin' || user?.role === 'Partner';

  const handleOpen = (item = null) => {
    if (item) {
      setEditMode(true);
      setSelectedItem(item);
      setFormData({
        item: item.item,
        monthlyPay: item.monthlyPay.toString(),
        otc: item.otc.toString(),
        description: item.description || '',
        category: item.category,
      });
    } else {
      setEditMode(false);
      setSelectedItem(null);
      setFormData({
        item: '',
        monthlyPay: '',
        otc: '',
        description: '',
        category: 'Other',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedItem(null);
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
      const itemData = {
        ...formData,
        monthlyPay: parseFloat(formData.monthlyPay) || 0,
        otc: parseFloat(formData.otc) || 0,
      };

      if (editMode) {
        await dispatch(updateCommercialItem({ 
          oppId, 
          id: selectedItem._id, 
          itemData 
        })).unwrap();
      } else {
        await dispatch(createCommercialItem({ oppId, itemData })).unwrap();
      }
      handleClose();
      // Refresh the list
      dispatch(getCommercialItems(oppId));
    } catch (error) {
      console.error('Error saving commercial item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await dispatch(deleteCommercialItem({ oppId, id })).unwrap();
        dispatch(getCommercialItems(oppId));
      } catch (error) {
        console.error('Error deleting commercial item:', error);
      }
    }
  };

  const handleExport = () => {
    window.open(`/api/export/${oppId}/excel`, '_blank');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
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
          <Typography variant="h4">Commercial Details</Typography>
          {currentSummary && (
            <Typography variant="subtitle1" color="textSecondary">
              {currentSummary.customerName} - {currentSummary.oppId}
            </Typography>
          )}
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={handleExport}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          {canEdit && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpen()}
            >
              Add Item
            </Button>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Totals Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary">
                Total Monthly Recurring Cost (MRC)
              </Typography>
              <Typography variant="h4">
                {formatCurrency(totals?.totalMRC || 0)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="secondary">
                Total One Time Cost (OTC)
              </Typography>
              <Typography variant="h4">
                {formatCurrency(totals?.totalOTC || 0)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Monthly Pay</TableCell>
                  <TableCell align="right">OTC</TableCell>
                  {canEdit && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{item.srNo}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {item.item}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.category} size="small" />
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.monthlyPay)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.otc)}
                    </TableCell>
                    {canEdit && (
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(item)}
                          title="Edit"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item._id)}
                          title="Delete"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {(!items || items.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={canEdit ? 7 : 6} align="center">
                      <Typography color="textSecondary">
                        No commercial items found. Add items to get started.
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
          {editMode ? 'Edit Commercial Item' : 'Add Commercial Item'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="item"
                  label="Item Name"
                  fullWidth
                  variant="outlined"
                  value={formData.item}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                    <MenuItem value="Software">Software</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  fullWidth
                  variant="outlined"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="monthlyPay"
                  label="Monthly Pay (₹)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.monthlyPay}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="otc"
                  label="One Time Cost (₹)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.otc}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0, step: 0.01 }}
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

export default Commercial;