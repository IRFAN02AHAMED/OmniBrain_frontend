import React, { useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import GlassCard from '../common/GlassCard';
import PlusMenu from './PlusMenu';
import AttachmentPreview from './AttachmentPreview';
import { useChatStore } from '../../store/chatStore';

const ChatComposer = () => {
  const { chatInput, setChatInput, sendMessage, uploadedAttachments } = useChatStore();
  const [plusAnchor, setPlusAnchor] = useState(null);
  const plusOpen = Boolean(plusAnchor);

  const handlePlusClick = (event) => {
    setPlusAnchor(event.currentTarget);
  };

  const handlePlusClose = () => {
    setPlusAnchor(null);
  };

  const handleSend = () => {
    if (chatInput.trim() || uploadedAttachments.length > 0) {
      sendMessage(chatInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = chatInput.trim().length > 0 || uploadedAttachments.length > 0;

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0B1120' : 'transparent'),
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {/* File Previews Above Box */}
      <AttachmentPreview />

      {/* Main Composer Box */}
      <GlassCard
        sx={{
          py: 0.75,
          px: 1.5,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          maxWidth: '896px',
          width: '100%',
          mx: 'auto',
          boxSizing: 'border-box',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          border: (theme) =>
            theme.palette.mode === 'dark' ? '1px solid #273244' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: 'none',
        }}
      >
        {/* Plus Action Menu Button */}
        <IconButton
          onClick={handlePlusClick}
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            color: 'text.secondary',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(108, 92, 231, 0.15)' : 'primary.container',
              color: 'primary.main',
            },
          }}
        >
          <MaterialIcon name="add" />
        </IconButton>

        {/* Input */}
        <Box sx={{ flexGrow: 1 }}>
          <InputBase
            fullWidth
            multiline
            maxRows={4}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your documents..."
            sx={{
              fontSize: '15px',
              color: 'text.primary',
              '& textarea::placeholder': {
                color: 'text.secondary',
                opacity: 0.5,
              },
            }}
          />
        </Box>

        {/* Send Button */}
        <IconButton
          onClick={handleSend}
          disabled={!canSend}
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            bgcolor: (theme) => {
              if (!canSend) return 'rgba(0,0,0,0.03)';
              return theme.palette.mode === 'dark' ? '#6C5CE7' : 'primary.main';
            },
            color: (theme) => {
              if (!canSend) return 'text.secondary';
              return '#ffffff';
            },
            '&:hover': {
              bgcolor: (theme) => {
                if (!canSend) return 'rgba(0,0,0,0.03)';
                return theme.palette.mode === 'dark' ? '#5b4dcf' : 'primary.dark';
              },
            },
          }}
        >
          <MaterialIcon name="arrow_upward" />
        </IconButton>
      </GlassCard>

      {/* Plus Menu Popup */}
      <PlusMenu anchorEl={plusAnchor} open={plusOpen} onClose={handlePlusClose} />
    </Box>
  );
};

export default ChatComposer;
