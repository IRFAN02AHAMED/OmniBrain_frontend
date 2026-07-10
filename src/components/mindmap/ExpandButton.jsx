import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const ExpandButton = ({ isExpanded, isLoading, onClick }) => {
  if (isLoading) {
    return <CircularProgress size={14} sx={{ color: '#94A3B8', flexShrink: 0 }} />;
  }

  return (
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      sx={{
        p: 0.2, color: '#94A3B8',
        '&:hover': { color: '#F5F5F5', bgcolor: 'transparent' },
        flexShrink: 0,
      }}
    >
      {isExpanded
        ? <MaterialIcon name="chevron_left" style={{ fontSize: 16 }} />
        : <MaterialIcon name="chevron_right" style={{ fontSize: 16 }} />
      }
    </IconButton>
  );
};

export default ExpandButton;
