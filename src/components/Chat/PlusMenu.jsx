import React, { useState, useRef } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import ConnectorSubmenu from '../connectors/ConnectorSubmenu';
import { useChatStore } from '../../store/chatStore';

const PlusMenu = ({ anchorEl, open, onClose }) => {
  const addAttachments = useChatStore((state) => state.addAttachments);
  const fileInputRef = useRef(null);

  // Submenu state
  const [submenuAnchor, setSubmenuAnchor] = useState(null);
  const submenuOpen = Boolean(submenuAnchor);

  const handleUploadClick = () => {
    onClose();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      addAttachments(files);
    }
  };

  const handleConnectorsHover = (event) => {
    setSubmenuAnchor(event.currentTarget);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
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
        {/* Hidden System file picker */}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx"
        />

        <MenuItem onClick={handleUploadClick}>
          <ListItemIcon>
            <MaterialIcon name="upload_file" style={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Upload Document" primaryTypographyProps={{ fontSize: '14px' }} />
        </MenuItem>

        <MenuItem onClick={handleConnectorsHover}>
          <ListItemIcon>
            <MaterialIcon name="hub" style={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Connectors" primaryTypographyProps={{ fontSize: '14px' }} />
          <MaterialIcon name="chevron_right" style={{ fontSize: '16px', color: '#94A3B8' }} />
        </MenuItem>
      </Menu>

      {/* Connectors second level menu */}
      <ConnectorSubmenu
        anchorEl={submenuAnchor}
        open={submenuOpen}
        onClose={() => {
          setSubmenuAnchor(null);
          onClose();
        }}
      />
    </>
  );
};

export default PlusMenu;
