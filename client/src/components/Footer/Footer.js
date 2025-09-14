import React from 'react';
import { Box, Typography, Container, Divider, Link, Grid } from '@mui/material';
import { Copyright, Business, Code, Security } from '@mui/icons-material';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.50',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          {/* Copyright Section */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={0.5} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Copyright sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {currentYear} Commercial Management System. All rights reserved.
              </Typography>
            </Box>
          </Grid>

          {/* Powered by Section */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={0.5} justifyContent={{ xs: 'center', md: 'flex-end' }}>
              <Business sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                Powered by{' '}
                <Link
                  href="https://www.esds.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  underline="hover"
                  sx={{ fontWeight: 'medium' }}
                >
                  ESDS Software Solution
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>       
      </Container>
    </Box>
  );
}

export default Footer;