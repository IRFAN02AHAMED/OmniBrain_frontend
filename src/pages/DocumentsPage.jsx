import React from 'react';
import { Box } from '@mui/material';
import AppSidebar from '../components/sidebar/AppSidebar';
import DocumentsList from '../components/documents/DocumentsList';

const DocumentsPage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', bgcolor: 'background.default' }}>
      {/* Left Sidebar */}
      <AppSidebar />

      {/* Main Content Workspace */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <DocumentsList />
      </Box>
    </Box>
  );
};

export default DocumentsPage;
