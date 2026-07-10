import apiClient from './apiClient';
import { KNOWLEDGE_MAP_NODES } from '../dummy/dummyData';

export const mapService = {
  /**
   * Fetch all knowledge graph nodes.
   */
  getMapNodes: async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Real API implementation:
    // const response = await apiClient.get('/knowledge-map');
    // return response.data;

    return KNOWLEDGE_MAP_NODES;
  }
};
export default mapService;
