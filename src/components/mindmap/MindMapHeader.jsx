import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import useMindMapStore from '../../store/useMindMapStore';
import { useReactFlow } from '@xyflow/react';

const MindMapHeader = ({ onClose }) => {
  const title = useMindMapStore((s) => s.title);
  const sourceCount = useMindMapStore((s) => s.sourceCount);
  const nodesById = useMindMapStore((s) => s.nodesById);
  const { fitView } = useReactFlow();

  const [downloadAnchor, setDownloadAnchor] = useState(null);

  const handleDownloadJson = () => {
    const json = JSON.stringify(nodesById, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mind-map.json';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadAnchor(null);
  };

  const handleDownloadSvg = () => {
    const svgEl = document.querySelector('.react-flow__renderer svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mind-map.svg';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadAnchor(null);
  };

  const iconBtn = {
    color: '#A8A8A8', p: 0.75, borderRadius: '8px',
    '&:hover': { color: '#F5F5F5', bgcolor: 'rgba(255,255,255,0.06)' },
  };

  return (
    <Box
      sx={{
        height: 60, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', px: 3,
        bgcolor: '#181818', borderBottom: '1px solid #2A2D36',
        flexShrink: 0, zIndex: 10,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#F5F5F5', lineHeight: 1.2 }} noWrap>
          {title || 'Mind Map'}
        </Typography>
        <Typography sx={{ fontSize: 12, color: '#53586A' }}>
          Based on {sourceCount} source{sourceCount !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Fit to view">
          <IconButton sx={iconBtn} onClick={() => fitView({ duration: 400, padding: 0.1 })}>
            <MaterialIcon name="fit_screen" style={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton sx={iconBtn} onClick={(e) => setDownloadAnchor(e.currentTarget)}>
            <MaterialIcon name="download" style={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close mind map">
          <IconButton sx={iconBtn} onClick={onClose}>
            <MaterialIcon name="close" style={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={downloadAnchor}
        open={Boolean(downloadAnchor)}
        onClose={() => setDownloadAnchor(null)}
        PaperProps={{
          sx: { bgcolor: '#303646', border: '1px solid #4A5363', borderRadius: '10px', minWidth: 170 },
        }}
      >
        <MenuItem onClick={handleDownloadSvg}>
          <ListItemIcon><MaterialIcon name="image" style={{ color: '#A8A8A8', fontSize: 18 }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 13, color: '#E2E8F0' }}>Export as SVG</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDownloadJson}>
          <ListItemIcon><MaterialIcon name="data_object" style={{ color: '#A8A8A8', fontSize: 18 }} /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 13, color: '#E2E8F0' }}>Export as JSON</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MindMapHeader;
