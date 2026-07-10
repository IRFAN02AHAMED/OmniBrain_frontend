/**
 * LeafNode.jsx
 * React Flow custom node — terminal subtopic, no expand button.
 */
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Typography } from '@mui/material';
import useMindMapStore from '../../store/useMindMapStore';

const LeafNode = memo(({ id, data, selected }) => {
  const setSelectedNode = useMindMapStore((s) => s.setSelectedNode);

  return (
    <Box
      onClick={() => setSelectedNode(id)}
      sx={{
        px: 1.5,
        py: 0.75,
        borderRadius: '7px',
        bgcolor: '#29413D',
        border: selected ? '1.5px solid #4CAF8A' : '1px solid #3A5A53',
        cursor: 'pointer',
        minWidth: 140,
        maxWidth: 260,
        boxShadow: selected
          ? '0 0 0 3px rgba(76,175,138,0.2)'
          : '0 1px 4px rgba(0,0,0,0.25)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          borderColor: '#4A7A6F',
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
          fontSize: 12,
          fontWeight: 400,
          color: '#CBD5E1',
          lineHeight: 1.35,
          userSelect: 'none',
        }}
      >
        {data.label}
      </Typography>
    </Box>
  );
});

LeafNode.displayName = 'LeafNode';
export default LeafNode;
