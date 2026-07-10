import React from 'react';
import { Button, Badge, Box } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import { useSourceStore } from '../../store/sourceStore';

const SourcesButton = () => {
  const { isOpen, setIsOpen, getActiveSourceCount } = useSourceStore();
  const count = getActiveSourceCount();

  return (
    <Button
      variant="outlined"
      onClick={() => setIsOpen(!isOpen)}
      sx={{
        borderRadius: '9999px',
        py: 0.5,
        px: 2.25,
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.12)',
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#F8FAFC' : 'text.primary',
        bgcolor: (theme) => {
          if (!isOpen) return 'transparent';
          return theme.palette.mode === 'dark' ? 'rgba(108, 92, 231, 0.15)' : 'primary.container';
        },
        '&:hover': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#6C5CE7' : 'primary.main',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(108, 92, 231, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textTransform: 'none',
        height: 36,
      }}
    >
      <MaterialIcon name="folder_open" style={{ fontSize: '18px' }} />
      <span>Sources</span>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.06)',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#6C5CE7' : 'primary.main',
          fontSize: '11px',
          fontWeight: 700,
          px: 1,
          py: 0.25,
          borderRadius: '9999px',
          minWidth: 16,
          textAlign: 'center',
        }}
      >
        {count}
      </Box>
      <MaterialIcon
        name={isOpen ? 'expand_less' : 'expand_more'}
        style={{ fontSize: '18px', color: '#94A3B8' }}
      />
    </Button>
  );
};

export default SourcesButton;
