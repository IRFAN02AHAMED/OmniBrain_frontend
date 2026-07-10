/**
 * MindMapViewer.jsx
 * Top-level assembler: header + canvas wrapped in ReactFlowProvider.
 * Handles all three states: loading, error, ready.
 */
import React from 'react';
import { Box } from '@mui/material';
import { ReactFlowProvider } from '@xyflow/react';

import MindMapHeader from './MindMapHeader';
import MindMapCanvas from './MindMapCanvas';
import MindMapLoading from './MindMapLoading';
import MindMapEmptyState from './MindMapEmptyState';
import MindMapErrorState from './MindMapErrorState';

import useMindMapStore from '../../store/useMindMapStore';
import { useMindMap } from '../../hooks/useMindMap';

/**
 * @param {object} props
 * @param {string|null} props.documentId - triggers generation
 * @param {string|null} props.mindMapId - loads existing
 * @param {function} props.onClose - callback to navigate away
 * @param {function} [props.onAskAI] - prefills chat with a topic
 */
const MindMapViewer = ({ documentId = null, mindMapId = null, onClose, onAskAI }) => {
  // Orchestrate loading
  useMindMap(documentId, mindMapId);

  const status = useMindMapStore((s) => s.status);
  const error = useMindMapStore((s) => s.error);
  const setStatus = useMindMapStore((s) => s.setStatus);

  const handleRetry = () => {
    setStatus('idle');
    useMindMapStore.getState().resetMindMap();
    // The hook will re-trigger on next render with same documentId
    window.location.reload();
  };

  const renderBody = () => {
    if (status === 'loading') return <MindMapLoading />;
    if (status === 'error') return <MindMapErrorState error={error} onRetry={handleRetry} />;
    if (status === 'idle' && !documentId && !mindMapId) {
      return <MindMapEmptyState />;
    }
    if (status === 'idle' && (documentId || mindMapId)) {
      // Hook is about to trigger loading — show loading screen
      return <MindMapLoading />;
    }
    return <MindMapCanvas onAskAI={onAskAI} />;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        bgcolor: '#181818',
        overflow: 'hidden',
      }}
    >
      <ReactFlowProvider>
        <MindMapHeader onClose={onClose} />
        {renderBody()}
      </ReactFlowProvider>
    </Box>
  );
};

export default MindMapViewer;
