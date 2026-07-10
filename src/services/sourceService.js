import apiClient from './apiClient';
import { INITIAL_SOURCE_TREE } from '../data/sourceTree';

export const sourceService = {
  /**
   * Fetches the Google Drive source control tree structure.
   */
  getSourceTree: async () => {
    try {
      const response = await apiClient.get('/google/drive/files/me');
      const files = response.data?.data || [];
      const driveNode = {
        id: 'root-drive',
        name: 'Google Drive',
        type: 'drive',
        toggled: true,
        expanded: true,
        children: files.map(f => ({
          id: f.id,
          name: f.name,
          type: f.mimeType?.includes('pdf') ? 'pdf' : f.mimeType?.includes('word') ? 'word' : 'gdocs',
          toggled: true,
          expanded: false,
          webViewLink: f.webViewLink,
          mimeType: f.mimeType,
          modifiedTime: f.modifiedTime,
          size: f.size
        }))
      };
      
      const newTree = JSON.parse(JSON.stringify(INITIAL_SOURCE_TREE));
      newTree.children = newTree.children.filter(c => c.id !== 'folder-drive');
      newTree.children.push(driveNode);
      
      return newTree;
    } catch (err) {
      console.warn('Falling back to mock source tree', err);
      return INITIAL_SOURCE_TREE;
    }
  },

  /**
   * Saves source selection changes for a specific chat context.
   */
  saveSourceSelection: async (chatId, sourceIds) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Real API integration:
    // const response = await apiClient.post(`/chats/${chatId}/sources`, { sourceIds });
    // return response.data;

    return { success: true, updatedCount: sourceIds.length };
  }
};
export default sourceService;
