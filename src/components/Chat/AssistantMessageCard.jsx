import React from 'react';
import { Box, Typography } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import GlassCard from '../common/GlassCard';
import MessageActions from './MessageActions';

const parseBoldText = (line) => {
  const parts = line.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <Box
          key={index}
          component="span"
          sx={{
            fontWeight: 700,
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
          }}
        >
          {part}
        </Box>
      );
    }
    return part;
  });
};

const formatBotText = (text) => {
  return text.split('\n').map((line, idx) => {
    if (line.startsWith('### ')) {
      return (
        <Typography
          key={idx}
          variant="h3"
          sx={{
            fontSize: '17px',
            fontWeight: 700,
            mt: 2,
            mb: 1,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#F8FAFC' : 'text.primary',
          }}
        >
          {line.replace('### ', '')}
        </Typography>
      );
    }
    if (line.startsWith('* ') || line.startsWith('• ')) {
      const cleanLine = line.replace(/^\* |^• /, '');
      return (
        <Box key={idx} sx={{ display: 'flex', gap: 1.5, ml: 1, mb: 0.75, alignItems: 'flex-start' }}>
          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>•</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14.5px' }}>
            {parseBoldText(cleanLine)}
          </Typography>
        </Box>
      );
    }
    return (
      <Typography
        key={idx}
        variant="body2"
        sx={{
          mb: 1.5,
          color: 'text.secondary',
          lineHeight: 1.6,
          fontSize: '14.5px',
        }}
      >
        {parseBoldText(line)}
      </Typography>
    );
  });
};

const AssistantMessageCard = ({ text, isStreaming = false }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(108, 92, 231, 0.3)'
              : '0 4px 12px rgba(59, 103, 88, 0.15)',
          flexShrink: 0,
        }}
      >
        <MaterialIcon name="grain" style={{ fontSize: '18px' }} filled />
      </Box>
      <GlassCard
        sx={{
          p: 2.25,
          borderRadius: '4px 20px 20px 20px',
          maxWidth: '78%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'background.card' : 'rgba(255, 255, 255, 0.65)',
          color: 'text.primary',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.background.border}`
              : '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            fontSize: '11px',
            color: 'primary.main',
            display: 'block',
            mb: 1,
            letterSpacing: '0.05em',
          }}
        >
          OmniBrain AI
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {formatBotText(text)}
        </Box>

        {isStreaming && (
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 0.5 }}
          >
            Thinking...
          </Typography>
        )}

        {/* Footer Actions */}
        <MessageActions />
      </GlassCard>
    </Box>
  );
};

export default AssistantMessageCard;
