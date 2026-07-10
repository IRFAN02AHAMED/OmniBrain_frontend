/**
 * mindMapLayout.js
 * Dagre-based automatic left-to-right graph layout for mind maps.
 * Returns positioned React Flow nodes.
 */
import dagre from 'dagre';

const DEFAULT_NODE_WIDTH = 220;
const DEFAULT_NODE_HEIGHT = 52;

// Per-level width overrides
const NODE_WIDTH_BY_LEVEL = {
  0: 160, // root — smaller pill
  1: 200,
  2: 240,
};

function getNodeDimensions(node) {
  const width = NODE_WIDTH_BY_LEVEL[node.level] ?? DEFAULT_NODE_WIDTH;
  const height = DEFAULT_NODE_HEIGHT;
  return { width, height };
}

/**
 * Calculate Dagre layout positions for visible nodes.
 *
 * @param {object[]} rfNodes - React Flow node objects (need id + data.level)
 * @param {object[]} rfEdges - React Flow edge objects
 * @returns {object[]} rfNodes with updated position { x, y }
 */
export function calculateLayout(rfNodes, rfEdges) {
  const g = new dagre.graphlib.Graph();

  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: 'LR',
    ranksep: 180,
    nodesep: 40,
    edgesep: 10,
    marginx: 60,
    marginy: 60,
  });

  rfNodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node.data || {});
    g.setNode(node.id, { width, height });
  });

  rfEdges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return rfNodes.map((node) => {
    const { x, y, width, height } = g.node(node.id);
    return {
      ...node,
      position: {
        x: x - width / 2,
        y: y - height / 2,
      },
    };
  });
}

export { DEFAULT_NODE_WIDTH, DEFAULT_NODE_HEIGHT, NODE_WIDTH_BY_LEVEL };
