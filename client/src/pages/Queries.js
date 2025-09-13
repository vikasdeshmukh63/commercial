import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Alert } from '@mui/material';
import { getSummaryByOppId } from '../store/slices/summarySlice';

function Queries() {
  const { oppId } = useParams();
  const dispatch = useDispatch();
  const { currentSummary } = useSelector((state) => state.summary);

  useEffect(() => {
    if (oppId) {
      dispatch(getSummaryByOppId(oppId));
    }
  }, [dispatch, oppId]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Queries & Responses
      </Typography>
      {currentSummary && (
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {currentSummary.customerName} - {currentSummary.oppId}
        </Typography>
      )}
      
      <Card>
        <CardContent>
          <Alert severity="info">
            Queries module is under development. This will include:
            <ul>
              <li>Query management with serial numbers</li>
              <li>Response tracking</li>
              <li>Status management (Open, In Progress, Resolved, Closed)</li>
              <li>Priority levels</li>
              <li>Assignment to team members</li>
            </ul>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Queries;