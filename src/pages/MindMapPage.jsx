import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/sidebar/AppSidebar';
import MindMapViewer from '../components/mindmap/MindMapViewer';
import useMindMapStore from '../store/useMindMapStore';
import { useChatStore } from '../store/chatStore';

const MindMapPage = () => {
  const navigate = useNavigate();
  const { documentId, mindMapId } = useMindMapStore();
  const { setChatInput } = useChatStore();

  const handleClose = () => {
    navigate('/chat');
  };

  const handleAskAI = (label) => {
    // Pre-fill chat and navigate to chat view
    setChatInput(`Explain this topic in more detail: ${label}`);
    navigate('/chat');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        bgcolor: '#181818',
      }}
    >
      {/* Reuse existing sidebar */}
      <AppSidebar />

      {/* Mind map takes remaining space */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <MindMapViewer
          documentId={documentId}
          mindMapId={mindMapId || undefined}
          onClose={handleClose}
          onAskAI={handleAskAI}
        />
      </Box>
    </Box>
  );
};

export default MindMapPage;
