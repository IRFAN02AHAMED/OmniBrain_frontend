/**
 * useMindMap.js
 * Orchestrates mind map initialization — fetches data, calls the store.
 */
import { useEffect } from 'react';
import useMindMapStore from '../store/useMindMapStore';
import { generateMindMap, getMindMap } from '../services/mindMapService';

const activeLoads = new Set();

/**
 * Call this hook at the top of MindMapPage.
 * It handles:
 *  - Loading an existing mind map from store/localStorage
 *  - Generating a new one from a documentId
 *
 * @param {string|null} documentId - trigger generation when provided
 * @param {string|null} existingMindMapId - load existing (optional)
 */
export function useMindMap(documentId = null, existingMindMapId = null) {
  const { status, mindMapId, initializeMindMap, setStatus, resetMindMap } =
    useMindMapStore();

  useEffect(() => {
    const loadKey = existingMindMapId ? `mindmap:${existingMindMapId}` : documentId ? `document:${documentId}` : null;

    // If already loaded for this doc, recompute and bail
    if (
      status === 'ready' &&
      (mindMapId === existingMindMapId || mindMapId)
    ) {
      // Re-trigger layout recompute after hydration from localStorage
      useMindMapStore.getState()._recompute();
      return;
    }

    if (!loadKey) {
      return;
    }

    if (activeLoads.has(loadKey) || useMindMapStore.getState().status === 'loading') {
      return;
    }

    async function load() {
      activeLoads.add(loadKey);
      setStatus('loading');
      try {
        let data;
        if (existingMindMapId) {
          data = await getMindMap(existingMindMapId);
        } else if (documentId) {
          data = await generateMindMap(documentId);
        } else {
          setStatus('idle');
          return;
        }
        initializeMindMap(data);
      } catch (err) {
        setStatus('error', err?.message || 'Failed to generate mind map');
      } finally {
        activeLoads.delete(loadKey);
      }
    }

    load();

    return () => {
      activeLoads.delete(loadKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId, existingMindMapId]);
}
