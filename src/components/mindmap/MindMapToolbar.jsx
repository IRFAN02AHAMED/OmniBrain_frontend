import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import { useReactFlow } from '@xyflow/react';

const MindMapToolbar = () => {
  const { zoomIn, zoomOut } = useReactFlow();

  const btn = {
    color: '#A8A8A8', p: 0.75, borderRadius: 0,
    '&:hover': { color: '#F5F5F5', bgcolor: 'rgba(255,255,255,0.06)' },
  };

  return (
    <Box
      sx={{
        position: 'absolute', bottom: 20, right: 20, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        bgcolor: '#303646', borderRadius: '10px',
        border: '1px solid #4A5363', overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      <Tooltip title="Zoom in (+)" placement="left">
        <IconButton onClick={() => zoomIn({ duration: 200 })} sx={btn}>
          <MaterialIcon name="add" style={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
      <Box sx={{ height: '1px', bgcolor: '#4A5363' }} />
      <Tooltip title="Zoom out (−)" placement="left">
        <IconButton onClick={() => zoomOut({ duration: 200 })} sx={btn}>
          <MaterialIcon name="remove" style={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MindMapToolbar;
