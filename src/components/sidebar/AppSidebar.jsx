import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import SidebarHeader from './SidebarHeader';
import NewChatButton from './NewChatButton';
import SidebarNavItem from './SidebarNavItem';
import RecentChatItem from './RecentChatItem';
import UserProfileMenu from './UserProfileMenu';
import { useChatStore } from '../../store/chatStore';

const AppSidebar = () => {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    activeRoute,
    setActiveRoute
  } = useChatStore();

  const handleNav = (route) => {
    setActiveRoute(route);
  };

  const handleRecentClick = (id) => {
    setActiveChatId(id);
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
          icon="chat"
          label="Chats"
          active={activeRoute === 'chat'}
          onClick={() => handleNav('chat')}
        />
        <SidebarNavItem
          icon="description"
          label="Documents"
          active={activeRoute === 'documents'}
          onClick={() => handleNav('documents')}
        />
        <SidebarNavItem
          icon="cloud_sync"
          label="Sync with Drive"
          active={false}
          onClick={() => {}}
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
              active={activeRoute === 'chat' && activeChatId === chat.id}
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
    </Box>
  );
};

export default AppSidebar;
