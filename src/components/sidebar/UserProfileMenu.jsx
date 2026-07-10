import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import GlassCard from '../common/GlassCard';
import { useThemeStore } from '../../store/themeStore';

const UserProfileMenu = () => {
  const { mode, toggleTheme } = useThemeStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <GlassCard
        onClick={handleClick}
        sx={{
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderRadius: '16px',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          }
        }}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80"
          alt="Aman Kumar"
          sx={{
            width: 38,
            height: 38,
            border: '2px solid #ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: '13px',
              lineHeight: 1.2,
              color: (theme) => theme.palette.mode === 'dark' ? '#F8FAFC' : 'text.primary'
            }}
            noWrap
          >
            Aman Kumar
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10.5px' }} noWrap>
            aman.kumar@gmail.com
          </Typography>
        </Box>
        <MaterialIcon name="expand_more" style={{ color: '#94A3B8', fontSize: '18px' }} />
      </GlassCard>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        PaperProps={{
          sx: {
            mt: -1,
            borderRadius: '12px',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
            border: (theme) => theme.palette.mode === 'dark' ? '1px solid #273244' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MaterialIcon name="person" style={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MaterialIcon name="settings" style={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>


        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MaterialIcon name="logout" style={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfileMenu;
