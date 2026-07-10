import apiClient from './apiClient';
import { INITIAL_SOURCE_TREE } from '../data/sourceTree';

export const sourceService = {
  /**
   * Fetches the Google Drive source control tree structure.
   */
  getSourceTree: async (chatId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Real API integration:
    // const response = await apiClient.get(`/chats/${chatId}/sources`);
    // return response.data;
    
    return INITIAL_SOURCE_TREE;
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
