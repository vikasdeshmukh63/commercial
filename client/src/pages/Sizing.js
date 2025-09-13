import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Alert } from '@mui/material';
import { getSummaryByOppId } from '../store/slices/summarySlice';

function Sizing() {
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
        Infrastructure Sizing
      </Typography>
      {currentSummary && (
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {currentSummary.customerName} - {currentSummary.oppId}
        </Typography>
      )}
      
      <Card>
        <CardContent>
          <Alert severity="info">
            Sizing module is under development. This will include:
            <ul>
              <li>Environment usage analysis</li>
              <li>Core and memory requirements</li>
              <li>OS and disk specifications</li>
              <li>Number of servers calculation</li>
              <li>Editable sizing grid</li>
            </ul>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Sizing;