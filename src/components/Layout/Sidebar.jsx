import React from 'react';
import { Box, Typography, Button, Avatar, IconButton, Tooltip } from '@mui/material';
import MaterialIcon from '../Common/MaterialIcon';
import GlassCard from '../Common/GlassCard';
import { useAppStore } from '../../store/store';

const Sidebar = () => {
  const {
    currentView,
    setCurrentView,
    user,
    recentChats,
    activeChatId,
    setActiveChatId,
    addNewChat,
    logout
  } = useAppStore();
  const displayName = user?.full_name || user?.name || 'OmniBrain User';
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || 'O';

  const handleNavClick = (view) => {
    setCurrentView(view);
    if (view === 'chat') {
      setActiveChatId(null); // Return to welcome page
    }
  };

  const selectChat = (chatId) => {
    setCurrentView('chat');
    setActiveChatId(chatId);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 288,
        height: '100vh',
        display: 'flex',
        flexDirection: 'col',
        boxSizing: 'border-box',
        p: 3,
        bgcolor: 'background.container',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Brand Identification */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(59, 103, 88, 0.2)',
          }}
        >
          <MaterialIcon name="grain" style={{ color: '#ffffff' }} filled />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: '20px',
              color: 'primary.main',
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            OmniBrain
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.05em',
            }}
          >
            AI Assistant
          </Typography>
        </Box>
      </Box>

      {/* New Chat Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<MaterialIcon name="add" />}
        onClick={addNewChat}
        sx={{
          py: 1.5,
          mb: 3,
          fontSize: '15px',
          fontWeight: 700,
          borderRadius: '12px',
        }}
      >
        New Chat
      </Button>

      {/* Main Navigation */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        <Box
          onClick={() => handleNavClick('chat')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            borderRadius: '12px',
            cursor: 'pointer',
            transition: '0.2s',
            bgcolor: currentView === 'chat' && !activeChatId ? 'primary.container' : 'transparent',
            color: currentView === 'chat' && !activeChatId ? 'primary.main' : 'text.secondary',
            fontWeight: currentView === 'chat' && !activeChatId ? 700 : 500,
            '&:hover': {
              bgcolor: currentView === 'chat' && !activeChatId ? 'primary.container' : 'rgba(0,0,0,0.03)',
            },
          }}
        >
          <MaterialIcon name="chat" />
          <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
            Chats
          </Typography>
        </Box>

        <Box
          onClick={() => handleNavClick('map')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            borderRadius: '12px',
            cursor: 'pointer',
            transition: '0.2s',
            bgcolor: currentView === 'map' ? 'primary.container' : 'transparent',
            color: currentView === 'map' ? 'primary.main' : 'text.secondary',
            fontWeight: currentView === 'map' ? 700 : 500,
            '&:hover': {
              bgcolor: currentView === 'map' ? 'primary.container' : 'rgba(0,0,0,0.03)',
            },
          }}
        >
          <MaterialIcon name="hub" filled={currentView === 'map'} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
            Knowledge Map
          </Typography>
        </Box>
      </Box>

      {/* Recent Chats List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: 'text.secondary',
            display: 'block',
            mb: 1.5,
            pl: 1,
          }}
        >
          Recent Chats
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {recentChats.map((chat) => (
            <Box
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.25,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: '0.2s',
                bgcolor: activeChatId === chat.id ? 'primary.container' : 'transparent',
                color: activeChatId === chat.id ? 'primary.main' : 'text.secondary',
                fontWeight: activeChatId === chat.id ? 700 : 400,
                '&:hover': {
                  bgcolor: activeChatId === chat.id ? 'primary.container' : 'rgba(0,0,0,0.02)',
                },
              }}
            >
              <MaterialIcon name="chat" style={{ fontSize: '20px' }} />
              <Typography
                variant="body2"
                noWrap
                sx={{ fontSize: '14px', fontWeight: 'inherit', flexGrow: 1 }}
              >
                {chat.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom Profile and Settings */}
      <GlassCard
        sx={{
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderRadius: '16px',
        }}
      >
        <Avatar
          alt={displayName}
          sx={{
            width: 38,
            height: 38,
            border: '2px solid #ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            bgcolor: '#d9f3e7',
            color: '#1f5f4a',
            fontSize: '14px',
            fontWeight: 800,
          }}
        >
          {avatarInitial}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px', lineHeight: 1.2 }} noWrap>
            {displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px' }}>
            {user.plan}
          </Typography>
        </Box>
        <Tooltip title="Log Out">
          <IconButton size="small" onClick={logout} sx={{ color: 'text.secondary' }}>
            <MaterialIcon name="logout" style={{ fontSize: '20px' }} />
          </IconButton>
        </Tooltip>
      </GlassCard>
    </Box>
  );
};

export default Sidebar;
