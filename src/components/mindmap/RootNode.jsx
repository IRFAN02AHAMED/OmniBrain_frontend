/**
 * RootNode.jsx
 * React Flow custom node — the central document topic.
 */
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Typography } from '@mui/material';
import useMindMapStore from '../../store/useMindMapStore';
import ExpandButton from './ExpandButton';

const RootNode = memo(({ id, data, selected }) => {
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
        px: 2,
        py: 1.25,
        borderRadius: '10px',
        bgcolor: '#5B567B',
        border: selected ? '1.5px solid #A89EFF' : '1.5px solid #7C75A8',
        cursor: 'pointer',
        minWidth: 130,
        maxWidth: 180,
        boxShadow: selected
          ? '0 0 0 3px rgba(168,158,255,0.25)'
          : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: '#F5F5F5',
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

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: 'transparent', border: 'none', width: 0, height: 0 }}
      />
    </Box>
  );
});

RootNode.displayName = 'RootNode';
export default RootNode;
