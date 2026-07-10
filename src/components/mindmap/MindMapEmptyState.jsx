import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const MindMapEmptyState = ({ onUpload }) => (
  <Box
    sx={{
      flexGrow: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 2.5, bgcolor: '#181818', px: 4,
    }}
  >
    <Box
      sx={{
        width: 72, height: 72, borderRadius: '20px',
        bgcolor: '#303646',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <MaterialIcon name="upload_file" style={{ color: '#A8A8A8', fontSize: 36 }} />
    </Box>

    <Box sx={{ textAlign: 'center', maxWidth: 320 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#F5F5F5', mb: 1 }}>
        No Document Selected
      </Typography>
      <Typography sx={{ fontSize: 13, color: '#A8A8A8', mb: 3 }}>
        Upload a document to generate an interactive mind map from its content.
      </Typography>
      <Typography sx={{ fontSize: 11, color: '#53586A', mb: 2 }}>
        Supported: PDF · DOCX · TXT · MD · PPTX · CSV · XLSX
      </Typography>
    </Box>

    {onUpload && (
      <Button
        variant="contained"
        onClick={onUpload}
        startIcon={<MaterialIcon name="upload_file" style={{ fontSize: 20 }} />}
        sx={{
          bgcolor: '#5B567B', '&:hover': { bgcolor: '#6C5CE7' },
          borderRadius: '10px', fontWeight: 600, textTransform: 'none',
        }}
      >
        Upload Document
      </Button>
    )}
  </Box>
);

export default MindMapEmptyState;
