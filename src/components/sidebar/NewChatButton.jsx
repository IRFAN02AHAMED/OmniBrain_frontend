import React from 'react';
import { Button } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import { useChatStore } from '../../store/chatStore';

const NewChatButton = () => {
  const addNewChat = useChatStore((state) => state.addNewChat);

  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={<MaterialIcon name="add" style={{ fontSize: '20px' }} />}
      onClick={addNewChat}
      sx={{
        py: 1.25,
        mb: 2.5,
        fontSize: '15px',
        fontWeight: 700,
        borderRadius: '12px',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #6C5CE7 0%, #8B7CF6 100%)'
            : 'primary.main',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0px 4px 16px rgba(108, 92, 231, 0.25)'
            : '0px 4px 16px rgba(59, 103, 88, 0.2)',
        '&:hover': {
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #5b4dcf 0%, #7a6be5 100%)'
              : 'primary.dark',
        }
      }}
    >
      New Chat
    </Button>
  );
};

export default NewChatButton;
