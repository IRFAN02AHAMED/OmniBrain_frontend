import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import GlassCard from '../common/GlassCard';

const UserMessageCard = ({ text, time }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', gap: 2, alignItems: 'flex-start' }}>
      <Avatar
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80"
        alt="You"
        sx={{
          width: 36,
          height: 36,
          border: '2px solid #ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      />
      <GlassCard
        sx={{
          p: 2,
          borderRadius: '20px 4px 20px 20px',
          maxWidth: '75%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'background.card' : 'primary.container',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.background.border}`
              : '1px solid rgba(172, 219, 201, 0.4)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.light', fontSize: '11px' }}>
            You
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6, fontSize: '10px' }}>
            {time}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: '15px',
            color: 'inherit',
            fontWeight: 500,
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </Typography>
      </GlassCard>
    </Box>
  );
};

export default UserMessageCard;
