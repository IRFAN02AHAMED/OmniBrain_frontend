import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, IconButton } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import GlassCard from '../common/GlassCard';
import { GLOBAL_DOCUMENTS } from '../../data/globalDocuments';

const DocumentsList = () => {
  return (
    <Box sx={{ p: 4, flexGrow: 1, overflowY: 'auto' }}>
      <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 700, mb: 1, color: 'primary.main' }}>
        Global Documents
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Manage documents uploaded across your workspaces. These files are referenced by OmniBrain AI when answering queries.
      </Typography>

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
            {GLOBAL_DOCUMENTS.map((doc) => (
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
                <TableCell sx={{ color: 'text.secondary' }}>{doc.size}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 700, bgcolor: 'rgba(108, 92, 231, 0.1)', color: '#8B7CF6', px: 1, py: 0.25, borderRadius: '4px' }}>
                    {doc.type}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#fc929b' } }}>
                    <MaterialIcon name="delete" style={{ fontSize: '18px' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DocumentsList;
