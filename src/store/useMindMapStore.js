/**
 * useMindMapStore.js
 * Normalized Zustand store for the mind map feature.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  transformMindMapResponse,
  transformChildrenResponse,
  getVisibleNodeIds,
  getAllDescendantIds,
  buildEdges,
} from '../utils/mindMapTransform';
import { calculateLayout } from '../utils/mindMapLayout';
import {
  expandMindMapNode,
  submitMindMapFeedback,
} from '../services/mindMapService';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Build RF-ready node objects from nodesById + visible list. */
function buildRFNodes(nodesById, visibleIds) {
  return visibleIds.map((id) => {
    const n = nodesById[id];
    return {
      id: n.id,
      type: n.level === 0 ? 'rootNode' : n.hasChildren ? 'branchNode' : 'leafNode',
      position: { x: 0, y: 0 }, // layout engine will override
      data: {
        label: n.label,
        summary: n.summary,
        level: n.level,
        hasChildren: n.hasChildren,
        isExpanded: n.isExpanded,
        isLoading: n.isLoading,
        childrenLoaded: n.childrenLoaded,
        sourceReference: n.sourceReference,
        parentId: n.parentId,
      },
    };
  });
}

/** Run layout engine and return positioned nodes. */
function layoutNodes(rfNodes, rfEdges) {
  if (rfNodes.length === 0) return [];
  return calculateLayout(rfNodes, rfEdges);
}

// ── Store ────────────────────────────────────────────────────────────────────

const useMindMapStore = create(
  persist(
    (set, get) => ({
      // ── Identity ────────────────────────────────────────────────────────
      mindMapId: null,
      documentId: null,
      title: '',
      sourceCount: 1,

      // ── Node data (normalized) ──────────────────────────────────────────
      nodesById: {},
      rootId: null,

      // ── UI state ────────────────────────────────────────────────────────
      selectedNodeId: null,
      status: 'idle', // 'idle' | 'loading' | 'ready' | 'error'
      error: null,
      feedback: null,
      viewport: { x: 0, y: 0, zoom: 0.8 },

      // ── Derived React Flow state (computed, not persisted) ──────────────
      rfNodes: [],
      rfEdges: [],

      // ── Internal helper to recompute rfNodes + rfEdges ──────────────────
      _recompute() {
        const { nodesById, rootId } = get();
        if (!rootId) return;

        const visibleIds = getVisibleNodeIds(nodesById, rootId);
        const rfEdges = buildEdges(nodesById, visibleIds);
        const rawNodes = buildRFNodes(nodesById, visibleIds);
        const rfNodes = layoutNodes(rawNodes, rfEdges);

        set({ rfNodes, rfEdges });
      },

      // ── Actions ──────────────────────────────────────────────────────────

      /**
       * Initialize the store from a raw API/mock response.
       */
      initializeMindMap(rawData) {
        const transformed = transformMindMapResponse(rawData);
        set({
          ...transformed,
          selectedNodeId: null,
          status: 'ready',
          error: null,
          feedback: null,
          rfNodes: [],
          rfEdges: [],
        });
        get()._recompute();
      },

      setStatus(status, error = null) {
        set({ status, error });
      },

      setSelectedNode(nodeId) {
        set({ selectedNodeId: nodeId === get().selectedNodeId ? null : nodeId });
      },

      setViewport(viewport) {
        set({ viewport });
      },

      /**
       * Expand a node — load children lazily if not yet loaded.
       */
      async expandNode(nodeId) {
        const { nodesById, mindMapId } = get();
        const node = nodesById[nodeId];
        if (!node || node.isExpanded) return;

        // If children already loaded, just toggle
        if (node.childrenLoaded) {
          set((state) => ({
            nodesById: {
              ...state.nodesById,
              [nodeId]: { ...state.nodesById[nodeId], isExpanded: true },
            },
          }));
          get()._recompute();
          return;
        }

        // Children not yet loaded — fetch lazily
        set((state) => ({
          nodesById: {
            ...state.nodesById,
            [nodeId]: { ...state.nodesById[nodeId], isLoading: true },
          },
        }));
        get()._recompute();

        try {
          const response = await expandMindMapNode(mindMapId, nodeId, {
            node_title: node.label,
            context: node.summary,
            depth: node.level + 1,
          });

          const newChildNodes = transformChildrenResponse(
            nodeId,
            response.children,
            node.level
          );
          const childIds = Object.keys(newChildNodes);

          set((state) => ({
            nodesById: {
              ...state.nodesById,
              ...newChildNodes,
              [nodeId]: {
                ...state.nodesById[nodeId],
                isLoading: false,
                isExpanded: true,
                childrenLoaded: true,
                childIds,
                hasChildren: childIds.length > 0,
              },
            },
          }));
        } catch (err) {
          set((state) => ({
            nodesById: {
              ...state.nodesById,
              [nodeId]: { ...state.nodesById[nodeId], isLoading: false },
            },
          }));
        }
        get()._recompute();
      },

      /**
       * Collapse a node — hide all descendants.
       */
      collapseNode(nodeId) {
        const { nodesById } = get();
        const descendants = getAllDescendantIds(nodesById, nodeId);

        const updates = {};
        descendants.forEach((id) => {
          updates[id] = { ...nodesById[id], isExpanded: false };
        });
        updates[nodeId] = { ...nodesById[nodeId], isExpanded: false };

        set((state) => ({
          nodesById: { ...state.nodesById, ...updates },
        }));
        get()._recompute();
      },

      /**
       * Toggle expand/collapse.
       */
      toggleNode(nodeId) {
        const node = get().nodesById[nodeId];
        if (!node) return;
        if (node.isExpanded) {
          get().collapseNode(nodeId);
        } else {
          get().expandNode(nodeId);
        }
      },

      resetMindMap() {
        set({
          mindMapId: null,
          documentId: null,
          title: '',
          sourceCount: 1,
          nodesById: {},
          rootId: null,
          selectedNodeId: null,
          status: 'idle',
          error: null,
          feedback: null,
          rfNodes: [],
          rfEdges: [],
        });
      },

      async submitFeedback(rating) {
        const { mindMapId } = get();
        set({ feedback: rating });
        try {
          await submitMindMapFeedback(mindMapId, rating);
        } catch {
          // Swallow — feedback is non-critical
        }
      },
    }),
    {
      name: 'omnibrain-mindmap',
      // Only persist identity + node data; rfNodes/rfEdges are derived
      partialize: (state) => ({
        mindMapId: state.mindMapId,
        documentId: state.documentId,
        title: state.title,
        sourceCount: state.sourceCount,
        nodesById: state.nodesById,
        rootId: state.rootId,
        viewport: state.viewport,
        feedback: state.feedback,
        status: state.status === 'ready' ? 'ready' : 'idle',
      }),
    }
  )
);

export default useMindMapStore;
