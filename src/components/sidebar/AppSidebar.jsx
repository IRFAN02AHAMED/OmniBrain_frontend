import React, { useState } from 'react';
import { Box, Typography, Link, Snackbar, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import SidebarHeader from './SidebarHeader';
import NewChatButton from './NewChatButton';
import SidebarNavItem from './SidebarNavItem';
import RecentChatItem from './RecentChatItem';
import UserProfileMenu from './UserProfileMenu';
import { useChatStore } from '../../store/chatStore';
import useDocumentStore from '../../store/useDocumentStore';

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    chats,
    activeChatId,
  } = useChatStore();

  const {
    googleAccessToken,
    setGoogleAccessToken,
    syncWithGoogleDrive,
    syncing,
    syncError,
    syncMessage,
    setSyncError,
    setSyncMessage
  } = useDocumentStore();

  const [toastOpen, setToastOpen] = useState(false);

  const handleRecentClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleAccessToken(tokenResponse.access_token);
      await syncWithGoogleDrive(tokenResponse.access_token);
      setToastOpen(true);
    },
    onError: (err) => {
      setSyncError('Google Login Failed: ' + (err?.message || 'Unknown error'));
      setToastOpen(true);
    },
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly'
  });

  const handleSyncClick = async () => {
    if (!googleAccessToken) {
      loginGoogle();
    } else {
      await syncWithGoogleDrive(googleAccessToken);
      setToastOpen(true);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
    setSyncError(null);
    setSyncMessage(null);
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        p: 2.5,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? theme.palette.background.sidebar : '#eceeed',
        borderRight: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? theme.palette.background.border : 'rgba(0,0,0,0.06)'}`,
        flexShrink: 0,
      }}
    >
      {/* Brand Logo & Name */}
      <SidebarHeader />

      {/* New Chat Action */}
      <NewChatButton />

      {/* Primary Links */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 3 }}>
        <SidebarNavItem
          icon="description"
          label="Documents"
          active={location.pathname === '/documents'}
          onClick={() => navigate('/documents')}
        />

        <SidebarNavItem
          icon="cloud_sync"
          label={syncing ? "Syncing..." : "Sync with Drive"}
          active={false}
          onClick={handleSyncClick}
          disabled={syncing}
        />
      </Box>

      {/* Recent Chats Section */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 800,
            fontSize: '11px',
            color: 'text.secondary',
            mb: 1.5,
            pl: 1,
            letterSpacing: '0.08em',
          }}
        >
          Recent Chats
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1, overflowY: 'auto' }}>
          {chats.slice(0, 5).map((chat) => (
            <RecentChatItem
              key={chat.id}
              title={chat.title}
              time={chat.time}
              active={location.pathname === `/chat/${chat.id}` && activeChatId === chat.id}
              onClick={() => handleRecentClick(chat.id)}
            />
          ))}
        </Box>

        <Link
          href="#"
          onClick={(e) => e.preventDefault()}
          sx={{
            color: 'primary.main',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'block',
            mt: 1.5,
            pl: 1,
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
        >
          View all chats →
        </Link>
      </Box>

      {/* User Section at the bottom */}
      <UserProfileMenu />

      {/* Sync Status Notifications */}
      <Snackbar
        open={toastOpen && (!!syncMessage || !!syncError)}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity={syncError ? "error" : "success"}
          sx={{ width: '100%' }}
        >
          {syncError || syncMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppSidebar;
