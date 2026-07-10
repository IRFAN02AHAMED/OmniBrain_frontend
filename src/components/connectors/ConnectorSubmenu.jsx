import React, { useEffect } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import { useConnectorStore } from '../../store/connectorStore';

const ConnectorSubmenu = ({ anchorEl, open, onClose }) => {
  const { connectors, openModal, loadConnectors } = useConnectorStore();

  useEffect(() => {
    loadConnectors();
  }, [loadConnectors]);

  const handleConnectorClick = (connector) => {
    openModal(connector);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      placement="right-start"
      PaperProps={{
        sx: {
          borderRadius: '12px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#111827' : '#ffffff',
          border: (theme) => theme.palette.mode === 'dark' ? '1px solid #273244' : '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          minWidth: 180,
        }
      }}
    >
      {connectors.map((conn) => (
        <MenuItem key={conn.id} onClick={() => handleConnectorClick(conn)}>
          <ListItemIcon sx={{ color: conn.connected ? 'primary.main' : 'text.secondary' }}>
            <MaterialIcon name={conn.icon} style={{ fontSize: '18px' }} />
          </ListItemIcon>
          <ListItemText
            primary={conn.name}
            secondary={conn.connected ? 'Connected' : 'Not Connected'}
            primaryTypographyProps={{ fontSize: '13px', fontWeight: 500 }}
            secondaryTypographyProps={{ fontSize: '10px' }}
          />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ConnectorSubmenu;
