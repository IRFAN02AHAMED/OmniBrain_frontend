import apiClient from './apiClient';
import { AVAILABLE_CONNECTORS } from '../data/connectors';

export const connectorService = {
  /**
   * Fetches lists of active and available integrations.
   */
  getConnectors: async () => {
    try {
      const token = localStorage.getItem('access_token');
      const jiraResponse = await apiClient.get('/connectors/jira/status');
      const jiraConnected = jiraResponse.data?.data?.connected || false;

      const githubResponse = await apiClient.get('/connectors/github/status');
      const githubConnected = githubResponse.data?.data?.connected || false;

      const updatedConnectors = JSON.parse(JSON.stringify(AVAILABLE_CONNECTORS));
      
      const jiraConn = updatedConnectors.find(c => c.id === 'jira');
      if (jiraConn) jiraConn.connected = jiraConnected;

      const githubConn = updatedConnectors.find(c => c.id === 'github');
      if (githubConn) githubConn.connected = githubConnected;

      // For Google products, if we have a token, we consider them connected since we did Google OAuth.
      updatedConnectors.forEach(c => {
        if (['gdrive', 'gdocs', 'gsheets', 'gmail'].includes(c.id)) {
          c.connected = !!token;
        }
      });

      return updatedConnectors;
    } catch (err) {
      console.warn("Failed to fetch connector statuses", err);
      return AVAILABLE_CONNECTORS;
    }
  },

  /**
   * Links a third-party application integration.
   */
  connectConnector: async (connectorId) => {
    const token = localStorage.getItem('access_token');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
    
    if (connectorId === 'jira') {
      window.location.href = `${API_BASE_URL}/connectors/jira/connect?token=${token}`;
    } else if (connectorId === 'github') {
      window.location.href = `${API_BASE_URL}/connectors/github/connect?token=${token}`;
    } else if (['gdrive', 'gdocs', 'gsheets', 'gmail'].includes(connectorId)) {
      window.location.href = `${API_BASE_URL}/auth/google/login/v2`;
    } else {
      console.warn(`Connection for ${connectorId} coming soon`);
    }
    
    return { id: connectorId, connected: false };
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
