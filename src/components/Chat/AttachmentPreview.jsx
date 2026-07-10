import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import GlassCard from '../common/GlassCard';
import { useChatStore } from '../../store/chatStore';

const AttachmentPreview = () => {
  const { uploadedAttachments, removeAttachment } = useChatStore();

  if (uploadedAttachments.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        px: 3,
        py: 1,
        overflowX: 'auto',
        maxWidth: '896px',
        width: '100%',
        mx: 'auto',
        mb: -1,
        boxSizing: 'border-box',
      }}
    >
      {uploadedAttachments.map((file) => (
        <GlassCard
          key={file.id}
          sx={{
            py: 0.75,
            px: 1.5,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0,0.02)',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #273244' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: 'none',
            flexShrink: 0,
          }}
        >
          <MaterialIcon name="insert_drive_file" style={{ color: '#6C5CE7', fontSize: '18px' }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }} noWrap>
              {file.name}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '9.5px', color: 'text.secondary', display: 'block' }}>
              {file.size} • {file.status}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => removeAttachment(file.id)} sx={{ p: 0.25, color: '#fc929b' }}>
            <MaterialIcon name="close" style={{ fontSize: '16px' }} />
          </IconButton>
        </GlassCard>
      ))}
    </Box>
  );
};

export default AttachmentPreview;
