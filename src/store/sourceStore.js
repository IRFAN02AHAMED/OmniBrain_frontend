import { create } from 'zustand';
import { INITIAL_SOURCE_TREE } from '../data/sourceTree';

// Recursive helper to set checked status for a node and all its children
const toggleNodeAndChildren = (node, checked) => {
  node.toggled = checked;
  node.indeterminate = false;
  if (node.children) {
    node.children.forEach(child => toggleNodeAndChildren(child, checked));
  }
};

// Recursive helper to recalculate folder states based on children
const updateTreeStates = (node) => {
  if (!node.children || node.children.length === 0) {
    return { toggled: node.toggled, indeterminate: false };
  }

  let allChecked = true;
  let allUnchecked = true;

  node.children.forEach(child => {
    const res = updateTreeStates(child);
    if (res.toggled) {
      allUnchecked = false;
    } else {
      allChecked = false;
    }
    if (res.indeterminate) {
      allChecked = false;
      allUnchecked = false;
    }
  });

  if (allChecked) {
    node.toggled = true;
    node.indeterminate = false;
  } else if (allUnchecked) {
    node.toggled = false;
    node.indeterminate = false;
  } else {
    node.toggled = false;
    node.indeterminate = true;
  }

  return { toggled: node.toggled, indeterminate: node.indeterminate };
};

// Recursive helper to find and update a specific node inside the tree
const findAndToggleNode = (node, targetId, checked) => {
  if (node.id === targetId) {
    toggleNodeAndChildren(node, checked);
    return true;
  }
  if (node.children) {
    for (let child of node.children) {
      if (findAndToggleNode(child, targetId, checked)) {
        return true;
      }
    }
  }
  return false;
};

// Recursive helper to toggle folder expansion
const findAndToggleExpand = (node, targetId) => {
  if (node.id === targetId) {
    node.expanded = !node.expanded;
    return true;
  }
  if (node.children) {
    for (let child of node.children) {
      if (findAndToggleExpand(child, targetId)) {
        return true;
      }
    }
  }
  return false;
};

// Helper to count selected leaves (files)
const countEnabledFiles = (node) => {
  if (!node) return 0;
  if (!node.children || node.children.length === 0) {
    return node.toggled ? 1 : 0;
  }
  return node.children.reduce((acc, child) => acc + countEnabledFiles(child), 0);
};

// Helper to collect selected leaf IDs
const collectSelectedIds = (node, ids) => {
  if (!node) return;
  if (!node.children || node.children.length === 0) {
    if (node.toggled) ids.push(node.id);
  } else {
    node.children.forEach(child => collectSelectedIds(child, ids));
  }
};

export const useSourceStore = create((set, get) => ({
  isOpen: false,
  globalDocumentsEnabled: true,
  chatDocumentsFolderEnabled: true,
  googleDriveEnabled: true,
  jiraEnabled: false,
  githubEnabled: false,
  sourceTree: JSON.parse(JSON.stringify(INITIAL_SOURCE_TREE)), // Deep clone

  setIsOpen: (isOpen) => set({ isOpen }),
  setGlobalDocumentsEnabled: (enabled) => set({ globalDocumentsEnabled: enabled }),
  setChatDocumentsFolderEnabled: (enabled) => set({ chatDocumentsFolderEnabled: enabled }),
  setGoogleDriveEnabled: (enabled) => set({ googleDriveEnabled: enabled }),
  setJiraEnabled: (enabled) => set({ jiraEnabled: enabled }),
  setGithubEnabled: (enabled) => set({ githubEnabled: enabled }),

  fetchSourceTree: async () => {
    const { sourceService } = await import('../services/sourceService');
    const tree = await sourceService.getSourceTree();
    set({ sourceTree: tree });
  },

  toggleNode: (nodeId, checked) => set((state) => {
    const newTree = JSON.parse(JSON.stringify(state.sourceTree));
    findAndToggleNode(newTree, nodeId, checked);
    updateTreeStates(newTree);
    return { sourceTree: newTree };
  }),

  toggleExpandNode: (nodeId) => set((state) => {
    const newTree = JSON.parse(JSON.stringify(state.sourceTree));
    findAndToggleExpand(newTree, nodeId);
    return { sourceTree: newTree };
  }),

  resetToDefault: () => set(() => {
    const resetTree = JSON.parse(JSON.stringify(INITIAL_SOURCE_TREE));
    return {
      sourceTree: resetTree,
      globalDocumentsEnabled: true,
      chatDocumentsFolderEnabled: true,
      googleDriveEnabled: true,
      jiraEnabled: false,
      githubEnabled: false
    };
  }),

  getActiveSourceCount: () => {
    const { sourceTree, globalDocumentsEnabled, chatDocumentsFolderEnabled } = get();
    // Count active files
    let count = countEnabledFiles(sourceTree);
    if (!globalDocumentsEnabled) {
      // Subtract files in global documents if toggle is off
      const globalNode = sourceTree.children?.find(c => c.id === 'folder-omnibrain')
        ?.children?.find(c => c.id === 'folder-global-docs');
      count -= countEnabledFiles(globalNode);
    }
    if (!chatDocumentsFolderEnabled) {
      // Subtract chat files
      const chatNode = sourceTree.children?.find(c => c.id === 'folder-chat-docs');
      count -= countEnabledFiles(chatNode);
    }
    return Math.max(0, count);
  },

  getSelectedFileIds: () => {
    const ids = [];
    const { sourceTree } = get();
    const driveNode = sourceTree.children?.find(c => c.id === 'root-drive' || c.id === 'folder-drive');
    if (driveNode) {
      collectSelectedIds(driveNode, ids);
    }
    return ids;
  }
}));
export default useSourceStore;
