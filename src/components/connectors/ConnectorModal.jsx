import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Alert } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import { useConnectorStore } from '../../store/connectorStore';
import connectorService from '../../services/connectorService';

const ConnectorModal = () => {
  const { modalOpen, activeConnector, closeModal, toggleConnector } = useConnectorStore();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!activeConnector) return null;

  const handleConnect = async () => {
    if (activeConnector.id === 'github' || activeConnector.id === 'jira') {
      try {
        setSubmitting(true);
        setErrorMessage('');
        const result = await connectorService.connectConnector(activeConnector.id);
        if (result?.connectUrl) {
          window.location.href = result.connectUrl;
          return;
        }
      } catch (error) {
        setErrorMessage(error?.message || `Failed to start ${activeConnector.name} connection.`);
      } finally {
        setSubmitting(false);
      }
      return;
    }

    toggleConnector(activeConnector.id);
    closeModal();
  };

  const isConnected = activeConnector.connected;

  return (
    <Dialog
      open={modalOpen}
      onClose={closeModal}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
          backgroundImage: 'none',
          border: (theme) => theme.palette.mode === 'dark' ? '1px solid #273244' : 'none',
          p: 1.5,
          maxWidth: 400,
          width: '100%',
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            bgcolor: isConnected ? 'rgba(172, 219, 201, 0.2)' : 'rgba(108, 92, 231, 0.1)',
            color: isConnected ? 'primary.main' : 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcon name={activeConnector.icon} style={{ fontSize: '24px' }} />
        </Box>
        <Typography variant="h3" sx={{ fontSize: '18px', fontWeight: 700 }}>
          {isConnected ? 'Disconnect' : 'Connect'} {activeConnector.name}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 1.5 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14.5px', lineHeight: 1.5 }}>
          {isConnected
            ? `Are you sure you want to disconnect your ${activeConnector.name} integration? This will revoke access to its documents in this workspace.`
            : `Grant OmniBrain AI permissions to access your ${activeConnector.name} account through OAuth so chat can use live connector data.`}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={closeModal}
          variant="outlined"
          sx={{
            borderRadius: '10px',
            borderColor: 'outline.main',
            color: 'text.secondary',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConnect}
          variant="contained"
          color={isConnected ? 'error' : 'primary'}
          disabled={submitting}
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            px: 3,
          }}
        >
          {submitting ? 'Redirecting...' : isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectorModal;
