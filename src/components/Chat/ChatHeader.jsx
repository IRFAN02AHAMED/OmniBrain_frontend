import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import SourcesButton from './SourcesButton';
import { useChatStore } from '../../store/chatStore';
import { useThemeStore } from '../../store/themeStore';

const ChatHeader = () => {
  const { activeChatId, chats, renameChat } = useChatStore();
  const { mode, toggleTheme } = useThemeStore();
  const activeChat = chats.find((c) => c.id === activeChatId);

  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    if (activeChat) {
      setTitleInput(activeChat.title);
    }
  }, [activeChat]);

  if (!activeChat) return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: 3,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0B1120' : 'rgba(248, 250, 249, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.06)'}`,
        zIndex: 50,
        position: 'sticky',
        top: 0,
      }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: 'text.secondary',
          borderRadius: '9999px',
          p: 1,
          '&:hover': { color: 'primary.main' }
        }}
      >
        <MaterialIcon name={mode === 'dark' ? 'light_mode' : 'dark_mode'} />
      </IconButton>
    </Box>
  );

  const handleSave = () => {
    setIsEditing(false);
    if (titleInput.trim() && titleInput !== activeChat.title) {
      renameChat(activeChatId, titleInput.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#0B1120' : 'rgba(248, 250, 249, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.06)'}`,
        zIndex: 50,
        position: 'sticky',
        top: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isEditing ? (
          <TextField
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '18px',
                fontWeight: 700,
                py: 0.5,
                px: 1,
              }
            }}
          />
        ) : (
          <>
            <Typography
              variant="h3"
              sx={{
                fontSize: '18px',
                fontWeight: 700,
                color: (theme) => theme.palette.mode === 'dark' ? '#F8FAFC' : 'primary.main',
                cursor: 'pointer',
              }}
              onClick={() => setIsEditing(true)}
            >
              {activeChat.title}
            </Typography>
            <IconButton size="small" onClick={() => setIsEditing(true)} sx={{ color: 'text.secondary' }}>
              <MaterialIcon name="edit" style={{ fontSize: '18px' }} />
            </IconButton>
          </>
        )}
      </Box>

      {/* Sources & Theme Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* <SourcesButton /> */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: 'text.secondary',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            borderRadius: '9999px',
            p: 1,
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(108,92,231,0.15)' : 'rgba(0,0,0,0.06)',
              color: 'primary.main',
            }
          }}
        >
          <MaterialIcon name={mode === 'dark' ? 'light_mode' : 'dark_mode'} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatHeader;
