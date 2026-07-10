import apiClient from './apiClient';
import { AVAILABLE_CONNECTORS } from '../data/connectors';

const OAUTH_CONNECTORS = new Set(['github', 'jira']);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const connectorService = {
  getConnectors: async () => {
    const connectors = [...AVAILABLE_CONNECTORS];

    const statusRequests = await Promise.allSettled([
      apiClient.get('/connectors/github/status'),
      apiClient.get('/connectors/jira/status'),
    ]);

    const githubStatus = statusRequests[0].status === 'fulfilled'
      ? !!statusRequests[0].value?.data?.data?.connected
      : false;
    const jiraStatus = statusRequests[1].status === 'fulfilled'
      ? !!statusRequests[1].value?.data?.data?.connected
      : false;

    return connectors.map((connector) => {
      if (connector.id === 'github') {
        return { ...connector, connected: githubStatus };
      }
      if (connector.id === 'jira') {
        return { ...connector, connected: jiraStatus };
      }
      return connector;
    });
  },

  connectConnector: async (connectorId) => {
    if (!OAUTH_CONNECTORS.has(connectorId)) {
      return { id: connectorId, connected: false, unsupported: true };
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Please sign in before connecting a connector.');
    }

    return {
      id: connectorId,
      connectUrl: `${API_BASE_URL}/connectors/${connectorId}/connect?token=${encodeURIComponent(token)}`,
    };
  },

  disconnectConnector: async (connectorId) => {
    return { id: connectorId, connected: false, unsupported: true };
  },
};
export default connectorService;
