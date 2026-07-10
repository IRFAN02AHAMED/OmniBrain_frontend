/**
 * mindMapTransform.js
 * Converts a nested tree (from API or mock) into a flat normalized state:
 *   nodesById: { [id]: MindMapNode }
 * Also infers rootId.
 */

/**
 * Recursively walks the raw tree and builds a flat nodesById map.
 * @param {object} rawNode - raw tree node with `children` array
 * @param {string|null} parentId
 * @param {number} level
 * @param {object} acc - accumulator map
 */
function walkNode(rawNode, parentId, level, acc) {
  const childIds = (rawNode.children || []).map((c) => c.id);

  acc[rawNode.id] = {
    id: rawNode.id,
    parentId,
    label: rawNode.label,
    summary: rawNode.summary || '',
    level,
    hasChildren: rawNode.has_children || childIds.length > 0,
    isExpanded: level === 0, // root always expanded; others start collapsed
    isLoading: false,
    childrenLoaded: childIds.length > 0,
    childIds,
    sourceReference: rawNode.source_reference || null,
  };

  (rawNode.children || []).forEach((child) => {
    walkNode(child, rawNode.id, level + 1, acc);
  });
}

/**
 * Transform a raw mind map API response into normalized store state.
 * @param {object} raw - { mindmap_id, document_id, title, source_count, root }
 * @returns {{ mindMapId, documentId, title, sourceCount, rootId, nodesById }}
 */
export function transformMindMapResponse(raw) {
  const nodesById = {};
  walkNode(raw.root, null, 0, nodesById);

  return {
    mindMapId: raw.mindmap_id,
    documentId: raw.document_id,
    title: raw.title,
    sourceCount: raw.source_count || 1,
    rootId: raw.root.id,
    nodesById,
  };
}

/**
 * Transform a lazy-expansion response into new child nodes.
 * @param {string} parentId
 * @param {object[]} rawChildren - array of raw child nodes
 * @param {number} parentLevel
 * @returns {{ [id]: MindMapNode }}
 */
export function transformChildrenResponse(parentId, rawChildren, parentLevel) {
  const newNodes = {};
  rawChildren.forEach((child) => {
    newNodes[child.id] = {
      id: child.id,
      parentId,
      label: child.label,
      summary: child.summary || '',
      level: parentLevel + 1,
      hasChildren: child.has_children || false,
      isExpanded: false,
      isLoading: false,
      childrenLoaded: false,
      childIds: [],
      sourceReference: child.source_reference || null,
    };
  });
  return newNodes;
}

/**
 * Compute which node IDs are currently visible.
 * A node is visible if all of its ancestors are expanded.
 * @param {object} nodesById
 * @param {string} rootId
 * @returns {string[]}
 */
export function getVisibleNodeIds(nodesById, rootId) {
  const visible = [];

  function visit(nodeId) {
    const node = nodesById[nodeId];
    if (!node) return;
    visible.push(nodeId);
    if (!node.isExpanded) return;
    node.childIds.forEach(visit);
  }

  visit(rootId);
  return visible;
}

/**
 * Recursively collect all descendant IDs of a node (not including self).
 */
export function getAllDescendantIds(nodesById, nodeId) {
  const descendants = [];
  function visit(id) {
    const node = nodesById[id];
    if (!node) return;
    node.childIds.forEach((cid) => {
      descendants.push(cid);
      visit(cid);
    });
  }
  visit(nodeId);
  return descendants;
}

/**
 * Build React Flow edges from visible node IDs.
 */
export function buildEdges(nodesById, visibleIds) {
  const visibleSet = new Set(visibleIds);
  const edges = [];

  visibleIds.forEach((nodeId) => {
    const node = nodesById[nodeId];
    if (!node) return;
    node.childIds.forEach((childId) => {
      if (visibleSet.has(childId)) {
        edges.push({
          id: `e-${nodeId}-${childId}`,
          source: nodeId,
          target: childId,
          type: 'smoothstep',
          style: { stroke: '#53586A', strokeWidth: 1.5 },
          animated: nodesById[nodeId]?.isLoading || false,
        });
      }
    });
  });

  return edges;
}
