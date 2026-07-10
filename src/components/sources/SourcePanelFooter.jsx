import React from 'react';
import { Box, Button, Link } from '@mui/material';
import { useSourceStore } from '../../store/sourceStore';

const SourcePanelFooter = () => {
  const { resetToDefault, setIsOpen } = useSourceStore();

  const handleDone = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.06)'}`,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
      }}
    >
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          resetToDefault();
        }}
        sx={{
          fontSize: '13px',
          fontWeight: 700,
          color: 'text.secondary',
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
          }
        }}
      >
        Reset to Default
      </Link>
      
      <Button
        onClick={handleDone}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '8px',
          py: 0.75,
          px: 3,
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: 'none',
        }}
      >
        Done
      </Button>
    </Box>
  );
};

export default SourcePanelFooter;
