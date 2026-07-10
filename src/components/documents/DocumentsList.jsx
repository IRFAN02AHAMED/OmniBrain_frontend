import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, IconButton, Button } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import apiClient from '../../services/apiClient';

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiClient.get('/google/drive/files/me?page_size=50');
        setDocuments(response.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch global documents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleOpenLink = (link) => {
    if (link) window.open(link, '_blank');
  };

  const handleSync = async () => {
    try {
      await apiClient.post('/sync/global');
      alert('Global drive sync triggered successfully!');
    } catch (err) {
      console.warn('Sync failed or route not present', err);
      alert('Sync with Drive - Coming soon');
    }
  };
  return (
    <Box sx={{ p: 4, flexGrow: 1, overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 700, mb: 1, color: 'primary.main' }}>
            Global Documents
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Manage documents uploaded across your workspaces. These files are referenced by OmniBrain AI when answering queries.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<MaterialIcon name="sync" />}
          onClick={handleSync}
          sx={{ borderRadius: '10px', textTransform: 'none' }}
        >
          Sync with Drive
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.06)'}`, borderRadius: '12px', overflow: 'hidden' }}>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Loading documents...
                </TableCell>
              </TableRow>
            ) : documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No global documents found. Upload some to get started.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow
                  key={doc.id}
                  sx={{
                    '&:last-child border-bottom': 0,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
                    }
                  }}
                >
                  <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <MaterialIcon name="insert_drive_file" style={{ color: '#6C5CE7' }} />
                      <span>{doc.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {doc.size ? `${(parseInt(doc.size) / 1024).toFixed(1)} KB` : 'Unknown'}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, bgcolor: 'rgba(108, 92, 231, 0.1)', color: '#8B7CF6', px: 1, py: 0.25, borderRadius: '4px' }}>
                      {doc.mimeType?.split('/').pop() || 'File'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ color: 'primary.main', mr: 1, '&:hover': { color: 'primary.dark' } }} onClick={() => handleOpenLink(doc.webViewLink)}>
                      <MaterialIcon name="open_in_new" style={{ fontSize: '18px' }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#fc929b' } }}>
                      <MaterialIcon name="delete" style={{ fontSize: '18px' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DocumentsList;
