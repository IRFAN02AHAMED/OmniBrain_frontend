/**
 * MindMapCanvas.jsx
 * The React Flow canvas — registers custom node types, renders nodes + edges.
 */
import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@mui/material';

import RootNode from './RootNode';
import BranchNode from './BranchNode';
import LeafNode from './LeafNode';
import MindMapToolbar from './MindMapToolbar';
import MindMapFeedback from './MindMapFeedback';
import NodeDetailPanel from './NodeDetailPanel';

import useMindMapStore from '../../store/useMindMapStore';

// Register custom node types — memoized outside component to avoid re-render
const nodeTypes = {
  rootNode: RootNode,
  branchNode: BranchNode,
  leafNode: LeafNode,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#53586A', strokeWidth: 1.5 },
  animated: false,
};

const MindMapCanvasInner = ({ onAskAI }) => {
  const storeRfNodes = useMindMapStore((s) => s.rfNodes);
  const storeRfEdges = useMindMapStore((s) => s.rfEdges);
  const selectedNodeId = useMindMapStore((s) => s.selectedNodeId);
  const setViewport = useMindMapStore((s) => s.setViewport);
  const savedViewport = useMindMapStore((s) => s.viewport);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView, setViewport: rfSetViewport } = useReactFlow();

  // Sync store → local RF state
  useEffect(() => {
    if (storeRfNodes.length === 0) return;

    // Mark selected node
    const decorated = storeRfNodes.map((n) => ({
      ...n,
      selected: n.id === selectedNodeId,
    }));

    setNodes(decorated);
    setEdges(storeRfEdges);
  }, [storeRfNodes, storeRfEdges, selectedNodeId, setNodes, setEdges]);

  // Fit view once when mind map first loads
  const [fittedOnce, setFittedOnce] = React.useState(false);
  useEffect(() => {
    if (nodes.length > 0 && !fittedOnce) {
      setTimeout(() => {
        fitView({ duration: 600, padding: 0.12 });
        setFittedOnce(true);
      }, 100);
    }
  }, [nodes.length, fittedOnce, fitView]);

  const onMoveEnd = useCallback(
    (_, viewport) => setViewport(viewport),
    [setViewport]
  );

  return (
    <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onMoveEnd={onMoveEnd}
        minZoom={0.15}
        maxZoom={2}
        fitView={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        panOnScroll
        zoomOnScroll
        style={{ background: '#181818' }}
      >
        <Background color="#2A2D36" gap={28} size={1} />
      </ReactFlow>

      {/* Custom controls */}
      <MindMapToolbar />
      <MindMapFeedback />

      {/* Node detail panel */}
      {selectedNodeId && <NodeDetailPanel onAskAI={onAskAI} />}
    </Box>
  );
};

export default MindMapCanvasInner;
