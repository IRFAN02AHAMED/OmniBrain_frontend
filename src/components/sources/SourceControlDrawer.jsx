import React from 'react';
import { Drawer, Box, Typography, IconButton, Switch, useMediaQuery, useTheme } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import SourceTree from './SourceTree';
import SourcePanelFooter from './SourcePanelFooter';
import { useSourceStore } from '../../store/sourceStore';

const SourceControlDrawer = () => {
  const {
    isOpen,
    setIsOpen,
    globalDocumentsEnabled,
    setGlobalDocumentsEnabled,
    chatDocumentsFolderEnabled,
    setChatDocumentsFolderEnabled
  } = useSourceStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      variant={isMobile ? 'temporary' : 'persistent'}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 420,
          boxSizing: 'border-box',
          bgcolor: isDark ? '#111827' : '#ffffff',
          borderLeft: `1px solid ${isDark ? '#273244' : 'rgba(0,0,0,0.06)'}`,
          boxShadow: isDark ? '-4px 0px 24px rgba(0,0,0,0.25)' : '-4px 0px 24px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }
      }}
    >
      {/* Header section */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${isDark ? '#273244' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontSize: '18px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}
          >
            Source Control
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.3 }}>
            Choose which sources to use for answers in this chat.
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'text.secondary' }}>
          <MaterialIcon name="close" />
        </IconButton>
      </Box>

      {/* Scrollable Tree Workspace */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Global Sources section */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 800,
              fontSize: '11px',
              color: 'text.secondary',
              letterSpacing: '0.08em',
              display: 'block',
              mb: 1.5,
            }}
          >
            Global Sources
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Global Documents Toggle */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                px: 1.5,
                borderRadius: '10px',
                bgcolor: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MaterialIcon name="description" style={{ color: '#6C5CE7', fontSize: '20px' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', fontSize: '13.5px' }}>
                  Global Documents (Drive)
                </Typography>
              </Box>
              <Switch
                checked={globalDocumentsEnabled}
                onChange={(e) => setGlobalDocumentsEnabled(e.target.checked)}
                size="small"
              />
            </Box>

            {/* Chat Documents Folder Toggle */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                px: 1.5,
                borderRadius: '10px',
                bgcolor: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MaterialIcon name="folder" style={{ color: '#ffdcc5', fontSize: '20px' }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', fontSize: '13.5px' }}>
                  Chat Documents Folder
                </Typography>
              </Box>
              <Switch
                checked={chatDocumentsFolderEnabled}
                onChange={(e) => setChatDocumentsFolderEnabled(e.target.checked)}
                size="small"
              />
            </Box>
          </Box>
        </Box>

        {/* Folder / File Tree Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <SourceTree />
        </Box>
      </Box>

      {/* Footer Controls */}
      <SourcePanelFooter />
    </Drawer>
  );
};

export default SourceControlDrawer;
