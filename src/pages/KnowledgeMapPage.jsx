import React, { useRef, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import GlassCard from '../components/Common/GlassCard';
import MaterialIcon from '../components/Common/MaterialIcon';
import { useAppStore } from '../store/store';
import { KNOWLEDGE_MAP_NODES } from '../dummy/dummyData';

const KnowledgeMapPage = () => {
  const { zoom, setZoom, panX, panY, setPan, searchQuery } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Mouse handlers for dragging/panning
  const handleMouseDown = (e) => {
    // Only drag if clicking the canvas background
    if (e.target.closest('.node-card')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan(e.clientX - dragStart.x, e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 10, 50));
  };

  // Filter nodes based on search query
  const matchesSearch = (text) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const rootNode = KNOWLEDGE_MAP_NODES.root;
  const level1Nodes = KNOWLEDGE_MAP_NODES.level1;
  const level2Nodes = KNOWLEDGE_MAP_NODES.level2;

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', bgcolor: 'background.default' }}>
      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Workspace */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', position: 'relative' }}>
        <Header />

        {/* Canvas Panning Area */}
        <Box
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          sx={{
            flexGrow: 1,
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.015) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }
          }}
        >
          {/* Inner content transformed by pan and zoom */}
          <Box
            sx={{
              position: 'absolute',
              width: 1800,
              height: 1000,
              transform: `translate(${panX}px, ${panY}px) scale(${zoom / 100})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              zIndex: 1,
            }}
          >
            {/* SVG Connecting lines */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 8px rgba(172, 219, 201, 0.3))',
              }}
            >
              {/* Connector paths with animation */}
              <defs>
                <linearGradient id="connector-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#acdbc9" />
                  <stop offset="100%" stopColor="#fc929b" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Paths linking root to Level 1 */}
              <path
                d="M338 500 C500 500, 550 250, 700 250"
                fill="none"
                stroke="#acdbc9"
                strokeWidth="2.5"
                strokeDasharray="5"
                style={{ animation: 'dash 20s linear infinite' }}
              />
              <path
                d="M338 500 C500 500, 550 500, 700 500"
                fill="none"
                stroke="#acdbc9"
                strokeWidth="2.5"
                strokeDasharray="5"
                style={{ animation: 'dash 20s linear infinite' }}
              />
              <path
                d="M338 500 C500 500, 550 750, 700 750"
                fill="none"
                stroke="#acdbc9"
                strokeWidth="2.5"
                strokeDasharray="5"
                style={{ animation: 'dash 20s linear infinite' }}
              />

              {/* Sub-connectors from Level 1 to Level 2 */}
              <path
                d="M964 250 C1000 250, 1000 180, 1080 180"
                fill="none"
                stroke="#acdbc9"
                strokeWidth="1.5"
                strokeDasharray="5"
                opacity="0.4"
                style={{ animation: 'dash 20s linear infinite' }}
              />
              <path
                d="M964 250 C1000 250, 1000 320, 1080 320"
                fill="none"
                stroke="#acdbc9"
                strokeWidth="1.5"
                strokeDasharray="5"
                opacity="0.4"
                style={{ animation: 'dash 20s linear infinite' }}
              />
            </svg>

            {/* Custom keyframe styles inside head tag represented by direct stylesheet injection */}
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -100;
                }
              }
              @keyframes floating {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
              }
              .floating-node {
                animation: floating 6s ease-in-out infinite;
              }
            `}</style>

            {/* Root Node (Far Left) */}
            <Box
              className="node-card floating-node"
              sx={{
                position: 'absolute',
                left: rootNode.x,
                top: rootNode.y,
                display: matchesSearch(rootNode.title) ? 'block' : 'none',
              }}
            >
              <GlassCard
                sx={{
                  p: 4,
                  width: 288,
                  borderRadius: '24px',
                  border: '2px solid #acdbc9',
                  boxShadow: '0 24px 48px 0 rgba(59, 103, 88, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(172, 219, 201, 0.2)', color: 'primary.main', display: 'flex' }}>
                    <MaterialIcon name="language" style={{ fontSize: '18px' }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>
                    {rootNode.category}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontSize: '20px', color: 'primary.main', fontWeight: 700, mb: 1 }}>
                  {rootNode.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px', lineHeight: 1.4 }}>
                  {rootNode.description}
                </Typography>
              </GlassCard>
            </Box>

            {/* Level 1 Nodes (Central Column) */}
            {level1Nodes.map((node) => (
              <Box
                key={node.id}
                className="node-card"
                sx={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  display: matchesSearch(node.title) ? 'block' : 'none',
                }}
              >
                <GlassCard
                  sx={{
                    p: 3,
                    width: 256,
                    borderRadius: '16px',
                    borderLeft: '4px solid #3b6758',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                        {node.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.3 }}>
                        {node.description}
                      </Typography>
                    </Box>
                    <MaterialIcon name="chevron_right" style={{ color: '#acdbc9' }} />
                  </Box>
                  <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'primary.container', fontWeight: 700, fontSize: '10px' }}>
                      CLICK TO EXPAND
                    </Typography>
                  </Box>
                </GlassCard>
              </Box>
            ))}

            {/* Level 2 Nodes (Faded Mockup column) */}
            {level2Nodes.map((node) => (
              <Box
                key={node.id}
                className="node-card"
                sx={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  opacity: 0.45,
                  display: matchesSearch(node.title) ? 'block' : 'none',
                }}
              >
                <GlassCard
                  sx={{
                    p: 2,
                    width: 192,
                    borderRadius: '12px',
                    borderColor: 'outline.variant',
                    transform: 'scale(0.95)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <MaterialIcon name={node.id === 'mosaic' ? 'history' : 'folder'} style={{ fontSize: '16px', color: '#717975' }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '13px' }}>
                      {node.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '10px', lineHeight: 1.2 }}>
                    {node.description}
                  </Typography>
                </GlassCard>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom Floating Canvas Controls */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            px: 4,
            py: 1.5,
            borderRadius: '9999px',
            bgcolor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
          }}
        >
          {/* Feedback controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, borderRight: '1px solid rgba(0,0,0,0.08)', pr: 3 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, mr: 1 }}>
              FEEDBACK
            </Typography>
            <Button
              size="small"
              variant="text"
              startIcon={<MaterialIcon name="thumb_up" style={{ fontSize: '16px' }} />}
              sx={{
                color: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)',
                borderRadius: '9999px',
                px: 2,
                '&:hover': { color: 'primary.main', bgcolor: 'rgba(172,219,201,0.2)' },
              }}
            >
              Good
            </Button>
            <Button
              size="small"
              variant="text"
              startIcon={<MaterialIcon name="thumb_down" style={{ fontSize: '16px' }} />}
              sx={{
                color: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)',
                borderRadius: '9999px',
                px: 2,
                '&:hover': { color: 'secondary.main', bgcolor: 'rgba(252,146,155,0.15)' },
              }}
            >
              Bad
            </Button>
          </Box>

          {/* Zoom Slider controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton size="small" onClick={handleZoomOut} sx={{ color: 'text.secondary' }}>
              <MaterialIcon name="zoom_out" />
            </IconButton>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', minWidth: 32, textAlign: 'center' }}>
              {zoom}%
            </Typography>
            <IconButton size="small" onClick={handleZoomIn} sx={{ color: 'text.secondary' }}>
              <MaterialIcon name="zoom_in" />
            </IconButton>
            <Box sx={{ width: 1, height: 16, bgcolor: 'rgba(0,0,0,0.08)', mx: 1 }} />
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <MaterialIcon name="fullscreen" />
            </IconButton>
          </Box>
        </Box>

        {/* Quick Action floating FAB */}
        <Box sx={{ position: 'absolute', bottom: 32, right: 32, zIndex: 10 }}>
          <IconButton
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              color: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(59, 103, 88, 0.25)',
              '&:hover': {
                bgcolor: '#2e5145',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s',
            }}
          >
            <MaterialIcon name="auto_awesome" filled />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default KnowledgeMapPage;
