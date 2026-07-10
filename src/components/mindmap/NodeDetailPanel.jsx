import React from 'react';
import { Box, Typography, IconButton, Divider, Button, Chip } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import useMindMapStore from '../../store/useMindMapStore';

const NodeDetailPanel = ({ onAskAI }) => {
  const selectedNodeId = useMindMapStore((s) => s.selectedNodeId);
  const nodesById = useMindMapStore((s) => s.nodesById);
  const setSelectedNode = useMindMapStore((s) => s.setSelectedNode);

  if (!selectedNodeId) return null;
  const node = nodesById[selectedNodeId];
  if (!node) return null;

  const ref = node.sourceReference;

  return (
    <Box
      sx={{
        position: 'absolute', top: 0, right: 0,
        width: 300, height: '100%',
        bgcolor: '#1E2533', borderLeft: '1px solid #303646',
        display: 'flex', flexDirection: 'column',
        zIndex: 20, boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          px: 2.5, py: 2,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1,
          borderBottom: '1px solid #303646',
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#F5F5F5', lineHeight: 1.4 }}>
          {node.label}
        </Typography>
        <IconButton size="small" onClick={() => setSelectedNode(null)} sx={{ color: '#53586A', flexShrink: 0, mt: -0.25 }}>
          <MaterialIcon name="close" style={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 2.5, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Chip
          label={node.level === 0 ? 'Root Topic' : node.level === 1 ? 'Main Branch' : 'Sub-branch'}
          size="small"
          sx={{ alignSelf: 'flex-start', bgcolor: '#303646', color: '#94A3B8', fontSize: 11 }}
        />

        {node.summary && (
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#53586A', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Summary
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.55 }}>
              {node.summary}
            </Typography>
          </Box>
        )}

        {ref && (
          <>
            <Divider sx={{ borderColor: '#303646' }} />
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#53586A', mb: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Source
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {ref.page && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8' }}>Page</Typography>
                    <Typography sx={{ fontSize: 12, color: '#F5F5F5', fontWeight: 600 }}>{ref.page}</Typography>
                  </Box>
                )}
                {ref.section && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8' }}>Section</Typography>
                    <Typography sx={{ fontSize: 12, color: '#F5F5F5', fontWeight: 600 }}>{ref.section}</Typography>
                  </Box>
                )}
                {ref.chunk_id && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, color: '#94A3B8' }}>Chunk ID</Typography>
                    <Typography sx={{ fontSize: 12, color: '#F5F5F5', fontWeight: 600 }}>{ref.chunk_id}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </>
        )}

        <Divider sx={{ borderColor: '#303646' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {ref && (
            <Button
              variant="outlined" size="small"
              startIcon={<MaterialIcon name="article" style={{ fontSize: 15 }} />}
              sx={{
                borderColor: '#4A5363', color: '#A8A8A8', textTransform: 'none', fontSize: 12,
                '&:hover': { borderColor: '#6C5CE7', color: '#F5F5F5' },
              }}
            >
              Open Source
            </Button>
          )}
          <Button
            variant="contained" size="small"
            startIcon={<MaterialIcon name="auto_awesome" style={{ fontSize: 15 }} />}
            onClick={() => onAskAI?.(node.label)}
            sx={{
              bgcolor: '#5B567B', color: '#F5F5F5', textTransform: 'none', fontSize: 12, fontWeight: 600,
              '&:hover': { bgcolor: '#6C5CE7' },
            }}
          >
            Ask AI about this
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NodeDetailPanel;
