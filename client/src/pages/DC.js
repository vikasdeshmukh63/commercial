import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Edit, Delete, GetApp, ExpandMore, Storage, Memory, Computer } from "@mui/icons-material";
import { getDCItems, createDCItem, updateDCItem, deleteDCItem, reset } from "../store/slices/dcSlice";
import { getSummaryByOppId } from "../store/slices/summarySlice";

function DC() {
  const { oppId } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.dc);
  const { currentSummary } = useSelector((state) => state.summary);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    environment: "Production",
    hostingComponents: "",
    unit: "Server",
    costPerUnit: "",
    quantity: 1,
    mrc: "",
    otc: "",
    serverName: "",
    location: "Primary DC",
    specs: {
      vCores: "",
      ram: "",
      hdd: "",
      os: "",
      db: "",
    },
  });

  useEffect(() => {
    if (oppId) {
      dispatch(getDCItems(oppId));
      dispatch(getSummaryByOppId(oppId));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, oppId]);

  const canEdit = user?.role === "Admin" || user?.role === "Partner";

  const handleOpen = (item = null) => {
    if (item) {
      setEditMode(true);
      setSelectedItem(item);
      setFormData({
        environment: item.environment,
        hostingComponents: item.hostingComponents,
        unit: item.unit,
        costPerUnit: item.costPerUnit.toString(),
        quantity: item.quantity,
        mrc: item.mrc.toString(),
        otc: item.otc.toString(),
        serverName: item.serverName || "",
        location: item.location,
        specs: {
          vCores: item.specs?.vCores?.toString() || "",
          ram: item.specs?.ram || "",
          hdd: item.specs?.hdd || "",
          os: item.specs?.os || "",
          db: item.specs?.db || "",
        },
      });
    } else {
      setEditMode(false);
      setSelectedItem(null);
      setFormData({
        environment: "Production",
        hostingComponents: "",
        unit: "Server",
        costPerUnit: "",
        quantity: 1,
        mrc: "",
        otc: "",
        serverName: "",
        location: "Primary DC",
        specs: {
          vCores: "",
          ram: "",
          hdd: "",
          os: "",
          db: "",
        },
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
    const { name, value } = e.target;
    if (name.startsWith("specs.")) {
      const specField = name.split(".")[1];
      setFormData({
        ...formData,
        specs: {
          ...formData.specs,
          [specField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemData = {
        ...formData,
        costPerUnit: parseFloat(formData.costPerUnit) || 0,
        quantity: parseInt(formData.quantity) || 1,
        mrc: parseFloat(formData.mrc) || 0,
        otc: parseFloat(formData.otc) || 0,
        specs: {
          ...formData.specs,
          vCores: parseInt(formData.specs.vCores) || 0,
        },
      };

      if (editMode) {
        await dispatch(
          updateDCItem({
            oppId,
            id: selectedItem._id,
            itemData,
          })
        ).unwrap();
      } else {
        await dispatch(createDCItem({ oppId, itemData })).unwrap();
      }
      handleClose();
      // Refresh the list
      dispatch(getDCItems(oppId));
    } catch (error) {
      console.error("Error saving DC item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this DC configuration?")) {
      try {
        await dispatch(deleteDCItem({ oppId, id })).unwrap();
        dispatch(getDCItems(oppId));
      } catch (error) {
        console.error("Error deleting DC item:", error);
      }
    }
  };

  const handleExport = () => {
    window.open(`/api/export/${oppId}/excel`, "_blank");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getEnvironmentColor = (environment) => {
    switch (environment) {
      case "Production":
        return "error";
      case "Staging":
        return "warning";
      case "Development":
        return "info";
      case "Testing":
        return "success";
      case "DR":
        return "secondary";
      default:
        return "default";
    }
  };

  const calculateTotals = () => {
    const totalMRC = items.reduce((sum, item) => sum + item.mrc * item.quantity, 0);
    const totalOTC = items.reduce((sum, item) => sum + item.otc * item.quantity, 0);
    return { totalMRC, totalOTC };
  };

  const totals = calculateTotals();

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
          <Typography variant="h4">Data Center Configuration</Typography>
          {currentSummary && (
            <Typography variant="subtitle1" color="textSecondary">
              {currentSummary.customerName} - {currentSummary.oppId}
            </Typography>
          )}
        </Box>
        <Box>
          <Button variant="outlined" startIcon={<GetApp />} onClick={handleExport} sx={{ mr: 1 }}>
            Export
          </Button>
          {canEdit && (
            <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
              Add Server
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
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" mb={1}>
                <Storage sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" color="primary">
                  Total Servers
                </Typography>
              </Box>
              <Typography variant="h4">{items.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" mb={1}>
                <Memory sx={{ mr: 1, color: "success.main" }} />
                <Typography variant="h6" color="success.main">
                  Total MRC
                </Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(totals.totalMRC)}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" mb={1}>
                <Computer sx={{ mr: 1, color: "warning.main" }} />
                <Typography variant="h6" color="warning.main">
                  Total OTC
                </Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(totals.totalOTC)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Servers Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Server Name</TableCell>
                  <TableCell>Environment</TableCell>
                  <TableCell>Hosting Components</TableCell>
                  <TableCell>Specifications</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Cost/Unit</TableCell>
                  <TableCell align="right">MRC</TableCell>
                  <TableCell align="right">OTC</TableCell>
                  {canEdit && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {item.serverName || "Unnamed Server"}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.unit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.environment} color={getEnvironmentColor(item.environment)} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.hostingComponents}</Typography>
                    </TableCell>
                    <TableCell>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="body2">
                            {item.specs?.vCores}C / {item.specs?.ram} / {item.specs?.hdd}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="caption" display="block">
                                <strong>vCores:</strong> {item.specs?.vCores || "N/A"}
                              </Typography>
                              <Typography variant="caption" display="block">
                                <strong>RAM:</strong> {item.specs?.ram || "N/A"}
                              </Typography>
                              <Typography variant="caption" display="block">
                                <strong>Storage:</strong> {item.specs?.hdd || "N/A"}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" display="block">
                                <strong>OS:</strong> {item.specs?.os || "N/A"}
                              </Typography>
                              <Typography variant="caption" display="block">
                                <strong>Database:</strong> {item.specs?.db || "N/A"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.location} variant="outlined" size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        {item.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{formatCurrency(item.costPerUnit)}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="success.main" fontWeight="bold">
                        {formatCurrency(item.mrc * item.quantity)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="warning.main" fontWeight="bold">
                        {formatCurrency(item.otc * item.quantity)}
                      </Typography>
                    </TableCell>
                    {canEdit && (
                      <TableCell>
                        <IconButton size="small" onClick={() => handleOpen(item)} title="Edit">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(item._id)} title="Delete" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {(!items || items.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={canEdit ? 10 : 9} align="center">
                      <Typography color="textSecondary">No DC configurations found. Add servers to get started.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{editMode ? "Edit DC Configuration" : "Add DC Configuration"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="serverName"
                  label="Server Name"
                  fullWidth
                  variant="outlined"
                  value={formData.serverName}
                  onChange={handleChange}
                  placeholder="e.g., Web-Server-01"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Environment</InputLabel>
                  <Select name="environment" value={formData.environment} label="Environment" onChange={handleChange}>
                    <MenuItem value="Production">Production</MenuItem>
                    <MenuItem value="Staging">Staging</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                    <MenuItem value="Testing">Testing</MenuItem>
                    <MenuItem value="DR">DR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="hostingComponents"
                  label="Hosting Components"
                  fullWidth
                  variant="outlined"
                  value={formData.hostingComponents}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Web Server, Application Server, Load Balancer"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="unit"
                  label="Unit Type"
                  fullWidth
                  variant="outlined"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Server, VM, Container"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Location</InputLabel>
                  <Select name="location" value={formData.location} label="Location" onChange={handleChange}>
                    <MenuItem value="Primary DC">Primary DC</MenuItem>
                    <MenuItem value="Secondary DC">Secondary DC</MenuItem>
                    <MenuItem value="Edge Location">Edge Location</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Server Specifications */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Server Specifications
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  margin="dense"
                  name="specs.vCores"
                  label="vCores"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.specs.vCores}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                  placeholder="e.g., 4"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  margin="dense"
                  name="specs.ram"
                  label="RAM"
                  fullWidth
                  variant="outlined"
                  value={formData.specs.ram}
                  onChange={handleChange}
                  placeholder="e.g., 16GB"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  margin="dense"
                  name="specs.hdd"
                  label="Storage (HDD/SSD)"
                  fullWidth
                  variant="outlined"
                  value={formData.specs.hdd}
                  onChange={handleChange}
                  placeholder="e.g., 500GB SSD"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="specs.os"
                  label="Operating System"
                  fullWidth
                  variant="outlined"
                  value={formData.specs.os}
                  onChange={handleChange}
                  placeholder="e.g., Ubuntu 20.04 LTS"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="specs.db"
                  label="Database"
                  fullWidth
                  variant="outlined"
                  value={formData.specs.db}
                  onChange={handleChange}
                  placeholder="e.g., PostgreSQL 13"
                />
              </Grid>

              {/* Cost Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Cost Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  margin="dense"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  margin="dense"
                  name="costPerUnit"
                  label="Cost per Unit (₹)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.costPerUnit}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  margin="dense"
                  name="mrc"
                  label="Monthly Recurring Cost (₹)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.mrc}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
              {editMode ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default DC;
