import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, Paper, TableRow, IconButton, Button, Tooltip,
  CircularProgress, Alert, Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '../common/MaterialIcon';
import useMindMapStore from '../../store/useMindMapStore';
import useDocumentStore from '../../store/useDocumentStore';
import documentService from '../../services/documentService';

const DocumentsList = () => {
  const navigate = useNavigate();
  const {
    documents,
    addDocument,
    removeDocument,
    uploading,
    setUploading,
    loadingDocuments,
    error,
    setError,
    loadDocuments,
  } = useDocumentStore();

  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleGenerateMindMap = (doc) => {
    useMindMapStore.getState().resetMindMap();
    useMindMapStore.setState({ documentId: doc.id, status: 'idle' });
    navigate('/mindmap');
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const startUpload = async (file) => {
    setUploading(true);
    setError(null);
    try {
      await documentService.uploadGlobalDocumentToDrive(file);

      const formatSize = (bytes) => {
        if (!bytes) return '1.0 MB';
        const kb = bytes / 1024;
        if (kb < 1024) return `${Math.round(kb)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
      };

      const fileExt = file.name.slice(file.name.lastIndexOf('.') + 1);

      const newDoc = {
        id: `drive-pending-${Date.now()}`,
        name: file.name,
        size: formatSize(file.size),
        type: fileExt.toLowerCase(),
        processingStatus: 'pending_sync',
      };

      addDocument(newDoc);
      setSuccessMessage(`"${file.name}" uploaded to Google Drive Global Documents. Click "Sync with Drive" to embed and store it in the database.`);
      setSuccessSnackbar(true);
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    startUpload(file);

    // Reset input value so same file can be selected again
    e.target.value = '';
  };

  return (
    <Box sx={{ p: 4, flexGrow: 1, overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 700, mb: 1, color: 'primary.main' }}>
            Global Documents
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Manage documents uploaded across your workspaces. Click <strong>Generate Mind Map</strong> to visualize any document as an interactive knowledge graph.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf,.docx,.txt,.md,.csv"
          />
          <Button
            variant="contained"
            onClick={handleUploadClick}
            disabled={uploading}
            startIcon={
              uploading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <MaterialIcon name="upload" style={{ fontSize: 20 }} />
              )
            }
            sx={{
              bgcolor: '#6C5CE7',
              color: '#FFFFFF',
              borderRadius: '10px',
              fontWeight: 600,
              textTransform: 'none',
              px: 2.5,
              py: 1,
              '&:hover': {
                bgcolor: '#5B4ED2',
              }
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(186,26,26,0.1)', color: '#FF6B6B', border: '1px solid rgba(186,26,26,0.2)' }}>
          {error}
        </Alert>
      )}

      {loadingDocuments && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: 'transparent',
          boxShadow: 'none',
          border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.06)'}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#151D2C' : 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>File Name</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>File Size</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Format</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow
                key={doc.id}
                sx={{
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
                  },
                }}
              >
                <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <MaterialIcon name="insert_drive_file" style={{ color: '#6C5CE7' }} />
                    <span>{doc.name}</span>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{doc.size}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      bgcolor: 'rgba(108, 92, 231, 0.1)',
                      color: '#8B7CF6',
                      px: 1,
                      py: 0.25,
                      borderRadius: '4px',
                    }}
                  >
                    {doc.type}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                    {/* Generate Mind Map */}
                    <Tooltip title="Generate Mind Map">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleGenerateMindMap(doc)}
                        startIcon={<MaterialIcon name="account_tree" style={{ fontSize: '16px !important' }} />}
                        sx={{
                          fontSize: '12px',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: '8px',
                          textTransform: 'none',
                          borderColor: (theme) => theme.palette.mode === 'dark' ? '#4A5363' : 'rgba(0,0,0,0.12)',
                          color: (theme) => theme.palette.mode === 'dark' ? '#A8A8A8' : 'text.secondary',
                          '&:hover': {
                            borderColor: '#6C5CE7',
                            color: '#6C5CE7',
                            bgcolor: 'rgba(108,92,231,0.06)',
                          },
                        }}
                      >
                        Mind Map
                      </Button>
                    </Tooltip>

                    {/* Delete */}
                    <IconButton size="small" onClick={() => removeDocument(doc.id)} sx={{ color: 'text.secondary', '&:hover': { color: '#fc929b' } }}>
                      <MaterialIcon name="delete" style={{ fontSize: '18px' }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Success Feedback */}
      <Snackbar
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(false)}
      >
        <Alert onClose={() => setSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DocumentsList;
