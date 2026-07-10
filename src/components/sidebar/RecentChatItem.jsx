import React from 'react';
import { Box, Typography } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const RecentChatItem = ({ title, time, active, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.25,
        borderRadius: '10px',
        cursor: 'pointer',
        transition: '0.2s',
        bgcolor: (theme) => {
          if (!active) return 'transparent';
          return theme.palette.mode === 'dark' ? 'rgba(108, 92, 231, 0.1)' : 'primary.container';
        },
        color: (theme) => {
          if (active) {
            return theme.palette.mode === 'dark' ? '#F8FAFC' : 'primary.main';
          }
          return theme.palette.mode === 'dark' ? '#94A3B8' : 'text.secondary';
        },
        fontWeight: active ? 700 : 400,
        '&:hover': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
        },
      }}
    >
      <MaterialIcon name="chat" style={{ fontSize: '18px' }} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: '13.5px',
            fontWeight: 'inherit',
            color: 'inherit',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: '10px',
            color: 'text.secondary',
            opacity: 0.8,
            display: 'block',
          }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

export default RecentChatItem;
