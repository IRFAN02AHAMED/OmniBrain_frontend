import React from 'react';
import { Box, Typography } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const SidebarHeader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(108, 92, 231, 0.3)'
              : '0 4px 12px rgba(59, 103, 88, 0.2)',
        }}
      >
        <MaterialIcon name="grain" style={{ color: '#ffffff' }} filled />
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: '20px',
          fontWeight: 800,
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
          lineHeight: 1,
        }}
      >
        OmniBrain AI
      </Typography>
    </Box>
  );
};

export default SidebarHeader;
