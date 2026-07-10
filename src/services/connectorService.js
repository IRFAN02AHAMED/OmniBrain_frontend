import apiClient from './apiClient';
import { AVAILABLE_CONNECTORS } from '../data/connectors';

export const connectorService = {
  /**
   * Fetches lists of active and available integrations.
   */
  getConnectors: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Real API integration:
    // const response = await apiClient.get('/connectors');
    // return response.data;
    
    return AVAILABLE_CONNECTORS;
  },

  /**
   * Links a third-party application integration.
   */
  connectConnector: async (connectorId) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Real API integration:
    // const response = await apiClient.post(`/connectors/${connectorId}/connect`);
    // return response.data;

    return { id: connectorId, connected: true };
  },

  /**
   * Deauthorizes a third-party application integration.
   */
  disconnectConnector: async (connectorId) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Real API integration:
    // const response = await apiClient.post(`/connectors/${connectorId}/disconnect`);
    // return response.data;

    return { id: connectorId, connected: false };
  }
};
export default connectorService;
