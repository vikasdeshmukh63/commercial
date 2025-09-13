import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Alert } from '@mui/material';
import { getSummaryByOppId } from '../store/slices/summarySlice';

function RACI() {
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
        RACI Matrix
      </Typography>
      {currentSummary && (
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {currentSummary.customerName} - {currentSummary.oppId}
        </Typography>
      )}
      
      <Card>
        <CardContent>
          <Alert severity="info">
            RACI module is under development. This will include:
            <ul>
              <li>Activity vs Roles matrix (Client/Partner/ESDS)</li>
              <li>RACI assignments (Responsible, Accountable, Consulted, Informed)</li>
              <li>Phase-wise categorization</li>
              <li>Editable role assignments</li>
              <li>Project phase management</li>
            </ul>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RACI;