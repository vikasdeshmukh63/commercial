import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Chip,
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
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import {
  getSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
  reset,
} from '../store/slices/summarySlice';

function Summary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { summaries, isLoading, error } = useSelector((state) => state.summary);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    partnerName: '',
    date: new Date().toISOString().split('T')[0],
    oppId: '',
    status: 'Draft',
  });

  useEffect(() => {
    dispatch(getSummaries());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const canEdit = user?.role === 'Admin' || user?.role === 'Partner';

  const handleOpen = (summary = null) => {
    if (summary) {
      setEditMode(true);
      setSelectedSummary(summary);
      setFormData({
        customerName: summary.customerName,
        partnerName: summary.partnerName,
        date: new Date(summary.date).toISOString().split('T')[0],
        oppId: summary.oppId,
        status: summary.status,
      });
    } else {
      setEditMode(false);
      setSelectedSummary(null);
      setFormData({
        customerName: '',
        partnerName: '',
        date: new Date().toISOString().split('T')[0],
        oppId: '',
        status: 'Draft',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedSummary(null);
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
      if (editMode) {
        await dispatch(updateSummary({ id: selectedSummary._id, summaryData: formData })).unwrap();
      } else {
        await dispatch(createSummary(formData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this summary?')) {
      try {
        await dispatch(deleteSummary(id)).unwrap();
      } catch (error) {
        console.error('Error deleting summary:', error);
      }
    }
  };

  const handleView = (summary) => {
    navigate(`/commercial/${summary.oppId}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Draft':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
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
        <Typography variant="h4">Project Summary</Typography>
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            New Project
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Opportunity ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Partner Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Total MRC</TableCell>
                  <TableCell align="right">Total OTC</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summaries?.map((summary) => (
                  <TableRow key={summary._id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {summary.oppId}
                      </Typography>
                    </TableCell>
                    <TableCell>{summary.customerName}</TableCell>
                    <TableCell>{summary.partnerName}</TableCell>
                    <TableCell>
                      {new Date(summary.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={summary.status}
                        color={getStatusColor(summary.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(summary.totalMRC)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(summary.totalOTC)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleView(summary)}
                        title="View Details"
                      >
                        <Visibility />
                      </IconButton>
                      {canEdit && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleOpen(summary)}
                            title="Edit"
                          >
                            <Edit />
                          </IconButton>
                          {user?.role === 'Admin' && (
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(summary._id)}
                              title="Delete"
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {(!summaries || summaries.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography color="textSecondary">
                        No projects found. Create your first project to get started.
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
          {editMode ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="customerName"
                  label="Customer Name"
                  fullWidth
                  variant="outlined"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="partnerName"
                  label="Partner Name"
                  fullWidth
                  variant="outlined"
                  value={formData.partnerName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="oppId"
                  label="Opportunity ID"
                  fullWidth
                  variant="outlined"
                  value={formData.oppId}
                  onChange={handleChange}
                  required
                  disabled={editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Summary;