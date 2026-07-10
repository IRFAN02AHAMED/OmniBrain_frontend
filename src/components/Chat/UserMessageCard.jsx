import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import GlassCard from '../common/GlassCard';
import { useAppStore } from '../../store/store';

const UserMessageCard = ({ text, time }) => {
  const user = useAppStore((state) => state.user);
  const displayName = user?.full_name || user?.name || 'You';
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || 'Y';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', gap: 2, alignItems: 'flex-start' }}>
      <Avatar
        alt={displayName}
        sx={{
          width: 36,
          height: 36,
          border: '2px solid #ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#d9f3e7',
          color: (theme) => theme.palette.mode === 'dark' ? '#F8FAFC' : '#1f5f4a',
          fontSize: '14px',
          fontWeight: 800,
        }}
      >
        {avatarInitial}
      </Avatar>
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
