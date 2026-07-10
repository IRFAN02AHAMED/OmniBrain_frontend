/**
 * BranchNode.jsx
 * React Flow custom node — first and second level topics with expand/collapse.
 */
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Typography } from '@mui/material';
import useMindMapStore from '../../store/useMindMapStore';
import ExpandButton from './ExpandButton';

const BranchNode = memo(({ id, data, selected }) => {
  const toggleNode = useMindMapStore((s) => s.toggleNode);
  const setSelectedNode = useMindMapStore((s) => s.setSelectedNode);

  const { label, hasChildren, isExpanded, isLoading } = data;

  return (
    <Box
      onClick={() => setSelectedNode(id)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.5,
        py: 1,
        borderRadius: '8px',
        bgcolor: '#394150',
        border: selected ? '1.5px solid #6C5CE7' : '1px solid #4A5363',
        cursor: 'pointer',
        minWidth: 160,
        maxWidth: 240,
        boxShadow: selected
          ? '0 0 0 3px rgba(108,92,231,0.2)'
          : '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          borderColor: '#6C7280',
        },
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'transparent', border: 'none', width: 0, height: 0 }}
      />

      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 500,
          color: '#E2E8F0',
          flexGrow: 1,
          lineHeight: 1.3,
          userSelect: 'none',
        }}
      >
        {label}
      </Typography>

      {hasChildren && (
        <ExpandButton
          isExpanded={isExpanded}
          isLoading={isLoading}
          onClick={() => toggleNode(id)}
        />
      )}

      {hasChildren && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: 'transparent', border: 'none', width: 0, height: 0 }}
        />
      )}
    </Box>
  );
});

BranchNode.displayName = 'BranchNode';
export default BranchNode;
