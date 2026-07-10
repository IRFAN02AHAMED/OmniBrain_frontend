/**
 * mindMapService.js
 * All API calls for the mind map feature.
 * Falls back to mock data when backend is unavailable (VITE_API_BASE_URL not set
 * or network error received).
 */
import apiClient from './apiClient';
import { mockMindMap } from '../data/mockMindMap';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Simulate network delay for mock responses
const mockDelay = (ms = 1200) => new Promise((res) => setTimeout(res, ms));

// ─── Generation ─────────────────────────────────────────────────────────────

/**
 * Generate a mind map from an uploaded document.
 * @param {string} documentId
 * @param {{ max_depth?: number, generation_mode?: string }} options
 */
export async function generateMindMap(documentId, options = {}) {
  if (USE_MOCK) {
    await mockDelay(1500);
    return { ...mockMindMap, document_id: documentId };
  }
  try {
    const { data } = await apiClient.post('/mindmaps/generate', {
      document_id: Number(documentId),
      max_depth: options.max_depth ?? 3,
      max_branches_per_node: options.max_branches_per_node ?? 5,
      generation_mode: options.generation_mode ?? 'mvp',
    });
    return data;
  } catch (error) {
    console.warn('Mind map generation failed, falling back to mock data.', error);
    await mockDelay(600);
    return { ...mockMindMap, document_id: String(documentId) };
  }
}

// ─── Get existing mind map ───────────────────────────────────────────────────

/**
 * Retrieve a previously generated mind map by its ID.
 */
export async function getMindMap(mindMapId) {
  if (USE_MOCK) {
    await mockDelay(600);
    return mockMindMap;
  }
  try {
    const { data } = await apiClient.get(`/mindmaps/${mindMapId}`);
    return data;
  } catch (error) {
    console.warn('Mind map fetch failed, falling back to mock data.', error);
    await mockDelay(400);
    return mockMindMap;
  }
}

// ─── Expand node (lazy child generation) ────────────────────────────────────

/**
 * Request child nodes for a specific branch.
 * @param {string} mindMapId
 * @param {string} nodeId
 * @param {{ node_title: string, context: string, depth: number }} payload
 */
export async function expandMindMapNode(mindMapId, nodeId, payload) {
  if (USE_MOCK) {
    await mockDelay(800);
    // Find this node in the mock and return its children as a lazy response
    function findNode(tree) {
      if (tree.id === nodeId) return tree;
      for (const child of tree.children || []) {
        const found = findNode(child);
        if (found) return found;
      }
      return null;
    }
    const found = findNode(mockMindMap.root);
    return {
      parent_id: nodeId,
      children: found ? (found.children || []) : [],
    };
  }
  try {
    const { data } = await apiClient.post(
      `/mindmaps/${mindMapId}/nodes/${nodeId}/expand`,
      payload
    );
    return data;
  } catch (error) {
    console.warn('Mind map node expansion failed, returning empty expansion.', error);
    return { parent_id: nodeId, children: [] };
  }
}

// ─── Regenerate ─────────────────────────────────────────────────────────────

export async function regenerateMindMap(mindMapId) {
  if (USE_MOCK) {
    await mockDelay(1500);
    return mockMindMap;
  }
  const { data } = await apiClient.post(`/mindmaps/${mindMapId}/regenerate`);
  return data;
}

export async function regenerateMindMapNode(mindMapId, nodeId) {
  if (USE_MOCK) {
    await mockDelay(800);
    return { parent_id: nodeId, children: [] };
  }
  const { data } = await apiClient.post(
    `/mindmaps/${mindMapId}/nodes/${nodeId}/regenerate`
  );
  return data;
}

// ─── Feedback ────────────────────────────────────────────────────────────────

/**
 * Submit user feedback (good | bad) for a mind map.
 */
export async function submitMindMapFeedback(mindMapId, rating) {
  if (USE_MOCK) {
    await mockDelay(300);
    return { success: true };
  }
  try {
    const { data } = await apiClient.post(`/mindmaps/${mindMapId}/feedback`, {
      rating,
      created_at: new Date().toISOString(),
    });
    return data;
  } catch (error) {
    console.warn('Mind map feedback endpoint unavailable.', error);
    return { success: true };
  }
}

// ─── Export ──────────────────────────────────────────────────────────────────

/**
 * Fetch a server-side export. Currently only used for JSON.
 * PNG and SVG are handled client-side.
 */
export async function exportMindMap(mindMapId, format = 'json') {
  if (USE_MOCK) {
    await mockDelay(400);
    return mockMindMap;
  }
  try {
    const { data } = await apiClient.get(`/mindmaps/${mindMapId}/export`, {
      params: { format },
    });
    return data;
  } catch (error) {
    console.warn('Mind map export endpoint unavailable, falling back to mock data.', error);
    await mockDelay(300);
    return mockMindMap;
  }
}
