import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  Assignment,
  People,
} from '@mui/icons-material';
import { getDashboardStats, getSummaries } from '../store/slices/summarySlice';

function StatCard({ title, value, icon, color = 'primary' }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`} sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardStats, summaries, isLoading } = useSelector((state) => state.summary);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getSummaries());
  }, [dispatch]);

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
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Welcome back, {user?.name}! Here's what's happening with your projects.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Projects"
            value={dashboardStats?.totalSummaries || 0}
            icon={<Assignment fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={dashboardStats?.activeSummaries || 0}
            icon={<TrendingUp fontSize="large" />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total MRC"
            value={formatCurrency(dashboardStats?.totalMRC || 0)}
            icon={<AttachMoney fontSize="large" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total OTC"
            value={formatCurrency(dashboardStats?.totalOTC || 0)}
            icon={<AttachMoney fontSize="large" />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Recent Projects */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Recent Projects</Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/summary')}
            >
              View All
            </Button>
          </Box>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Opportunity ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Partner</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">MRC</TableCell>
                  <TableCell align="right">OTC</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summaries?.slice(0, 5).map((summary) => (
                  <TableRow key={summary._id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {summary.oppId}
                      </Typography>
                    </TableCell>
                    <TableCell>{summary.customerName}</TableCell>
                    <TableCell>{summary.partnerName}</TableCell>
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
                      {new Date(summary.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/commercial/${summary.oppId}`)}
                      >
                        View
                      </Button>
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
    </Box>
  );
}

export default Dashboard;