import React from 'react';
import { Box, Typography } from '@mui/material';
import MaterialIcon from '../Common/MaterialIcon';

const WelcomeScreen = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        position: 'relative',
      }}
    >
      {/* Luminous Grain Icon */}
      <Box
        sx={{
          width: 96,
          height: 96,
          borderRadius: '24px',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 24px 48px 0 rgba(59, 103, 88, 0.3)',
          background: 'rgba(59, 103, 88, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          mb: 3,
        }}
      >
        <MaterialIcon name="grain" style={{ fontSize: '48px' }} filled />
      </Box>

      {/* Greeting Title */}
      <Typography variant="h2" sx={{ color: 'primary.main', mb: 1, fontWeight: 700 }}>
        Welcome to OmniBrain
      </Typography>

      {/* Subtext description */}
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 450 }}>
        Ask a question, upload a document, or explore your knowledge map to get started.
      </Typography>

      {/* Soft Background blur element */}
      <Box
        sx={{
          position: 'absolute',
          zIndex: -10,
          width: 256,
          height: 256,
          bgcolor: 'primary.container',
          opacity: 0.15,
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
      />
    </Box>
  );
};

export default WelcomeScreen;
