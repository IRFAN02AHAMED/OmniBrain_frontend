import React from 'react';
import { Box, Typography } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const SidebarNavItem = ({ icon, label, active, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1.5,
        borderRadius: '12px',
        cursor: 'pointer',
        transition: '0.2s',
        bgcolor: (theme) => {
          if (!active) return 'transparent';
          return theme.palette.mode === 'dark' ? 'rgba(108, 92, 231, 0.15)' : 'primary.container';
        },
        color: (theme) => {
          if (active) {
            return theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main';
          }
          return theme.palette.mode === 'dark' ? 'text.secondary' : 'text.secondary';
        },
        fontWeight: active ? 700 : 500,
        '&:hover': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
        },
      }}
    >
      <MaterialIcon name={icon} filled={active} />
      <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit', fontSize: '15px' }}>
        {label}
      </Typography>
    </Box>
  );
};

export default SidebarNavItem;
