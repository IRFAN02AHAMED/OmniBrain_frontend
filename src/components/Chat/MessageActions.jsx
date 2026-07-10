import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const MessageActions = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1.5, ml: -0.5 }}>
      <Tooltip title="Copy text">
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <MaterialIcon name="content_copy" style={{ fontSize: '18px' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share thread">
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <MaterialIcon name="share" style={{ fontSize: '18px' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Helpful (Thumbs up)">
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <MaterialIcon name="thumb_up" style={{ fontSize: '18px' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Not helpful (Thumbs down)">
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'secondary.main' } }}>
          <MaterialIcon name="thumb_down" style={{ fontSize: '18px' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Regenerate response">
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <MaterialIcon name="refresh" style={{ fontSize: '18px' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MessageActions;
