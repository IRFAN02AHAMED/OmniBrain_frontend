import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import SourceToggle from './SourceToggle';
import { useSourceStore } from '../../store/sourceStore';

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <MaterialIcon name="picture_as_pdf" style={{ color: '#fc929b', fontSize: '20px' }} />;
    case 'word':
      return <MaterialIcon name="description" style={{ color: '#8B7CF6', fontSize: '20px' }} />;
    case 'excel':
      return <MaterialIcon name="table_chart" style={{ color: '#acdbc9', fontSize: '20px' }} />;
    case 'txt':
      return <MaterialIcon name="insert_drive_file" style={{ color: '#94A3B8', fontSize: '20px' }} />;
    case 'gdocs':
      return <MaterialIcon name="description" style={{ color: '#8B7CF6', fontSize: '20px' }} />;
    case 'gsheets':
      return <MaterialIcon name="table_chart" style={{ color: '#acdbc9', fontSize: '20px' }} />;
    case 'gmail':
      return <MaterialIcon name="mail" style={{ color: '#fc929b', fontSize: '20px' }} />;
    case 'drive':
      return <MaterialIcon name="cloud" style={{ color: '#8B7CF6', fontSize: '20px' }} />;
    default:
      return <MaterialIcon name="folder" style={{ color: '#ffdcc5', fontSize: '20px' }} />;
  }
};

const SourceTreeItem = ({ node, level = 0 }) => {
  const { toggleNode, toggleExpandNode } = useSourceStore();

  const isFolder = node.children && node.children.length > 0;
  const isExpanded = node.expanded;

  const handleToggle = (checked) => {
    toggleNode(node.id, checked);
  };

  const handleExpand = () => {
    if (isFolder) {
      toggleExpandNode(node.id);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Node Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 0.75,
          pl: level * 3, // Indent based on depth level
          pr: 1,
          borderRadius: '8px',
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
          }
        }}
      >
        {/* Expand / Collapse Chevron */}
        <Box sx={{ width: 28, display: 'flex', justifyContent: 'center' }}>
          {isFolder && (
            <IconButton size="small" onClick={handleExpand} sx={{ p: 0.25, color: 'text.secondary' }}>
              <MaterialIcon
                name={isExpanded ? 'expand_more' : 'chevron_right'}
                style={{ fontSize: '18px' }}
              />
            </IconButton>
          )}
        </Box>

        {/* Icon (File or Folder type) */}
        <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
          {isFolder ? (
            <MaterialIcon
              name={isExpanded ? 'folder_open' : 'folder'}
              style={{ color: '#ffdcc5', fontSize: '20px' }}
              filled={!isExpanded}
            />
          ) : (
            getFileIcon(node.type)
          )}
        </Box>

        {/* Label Name */}
        <Typography
          variant="body2"
          sx={{
            flexGrow: 1,
            fontSize: '13.5px',
            color: 'text.primary',
            fontWeight: 500,
            userSelect: 'none',
            cursor: isFolder ? 'pointer' : 'default',
          }}
          onClick={handleExpand}
          noWrap
        >
          {node.name}
        </Typography>

        {/* Toggle Switch */}
        <SourceToggle
          checked={node.toggled}
          indeterminate={node.indeterminate}
          onChange={handleToggle}
        />
      </Box>

      {/* Render Nested Children if Expanded */}
      {isFolder && isExpanded && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {node.children.map((child) => (
            <SourceTreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SourceTreeItem;
