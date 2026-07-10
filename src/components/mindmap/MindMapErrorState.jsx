import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const MindMapErrorState = ({ error, onRetry }) => (
  <Box
    sx={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      bgcolor: '#181818',
      px: 4,
    }}
  >
    <Box
      sx={{
        width: 64, height: 64, borderRadius: '18px',
        bgcolor: 'rgba(186,26,26,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <MaterialIcon name="error" style={{ color: '#FF6B6B', fontSize: 32 }} />
    </Box>

    <Box sx={{ textAlign: 'center', maxWidth: 340 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#F5F5F5', mb: 1 }}>
        Generation Failed
      </Typography>
      <Typography sx={{ fontSize: 13, color: '#A8A8A8', mb: 3 }}>
        {error || 'An unexpected error occurred while generating the mind map.'}
      </Typography>
    </Box>

    {onRetry && (
      <Button
        variant="outlined"
        onClick={onRetry}
        startIcon={<MaterialIcon name="refresh" style={{ fontSize: 20 }} />}
        sx={{
          borderColor: '#53586A', color: '#A8A8A8',
          '&:hover': { borderColor: '#6C5CE7', color: '#F5F5F5' },
          borderRadius: '10px', textTransform: 'none',
        }}
      >
        Retry
      </Button>
    )}
  </Box>
);

export default MindMapErrorState;
