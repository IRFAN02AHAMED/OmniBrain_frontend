import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import AppSidebar from '../components/sidebar/AppSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessageList from '../components/chat/ChatMessageList';
import ChatComposer from '../components/chat/ChatComposer';
import SourceControlDrawer from '../components/sources/SourceControlDrawer';
import ConnectorModal from '../components/connectors/ConnectorModal';
import { useChatStore } from '../store/chatStore';
import { useSourceStore } from '../store/sourceStore';

const ChatPage = () => {
  const { activeChatId, messages } = useChatStore();
  const sourceDrawerOpen = useSourceStore((state) => state.isOpen);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const activeMessages = activeChatId ? messages[activeChatId] || [] : [];

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Sidebar Layout */}
      <AppSidebar />

      {/* Main Chat Workspace */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1)',
          mr: !isMobile && sourceDrawerOpen ? '420px' : 0, // Shrink chat width when drawer is persistent on desktop
        }}
      >
        {/* Sticky Header */}
        <ChatHeader />

        {/* Scrollable conversation logs */}
        <ChatMessageList messages={activeMessages} />

        {/* Bottom Composer Input */}
        <ChatComposer />
      </Box>

      {/* Slide-out Source Control Panel */}
      <SourceControlDrawer />

      {/* Connection confirmation dialog */}
      <ConnectorModal />
    </Box>
  );
};

export default ChatPage;
