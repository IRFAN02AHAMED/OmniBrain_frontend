import apiClient from './apiClient';
import { RECENT_CHATS, CHAT_MESSAGES, AVAILABLE_MODELS } from '../dummy/dummyData';

export const chatService = {
  /**
   * Fetch list of recent chat conversations.
   */
  getRecentChats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Real API implementation:
    // const response = await apiClient.get('/chats');
    // return response.data;

    return RECENT_CHATS;
  },

  /**
   * Fetch all messages inside a specific chat channel.
   * @param {string} chatId
   */
  getChatMessages: async (chatId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Real API implementation:
    // const response = await apiClient.get(`/chats/${chatId}/messages`);
    // return response.data;

    return CHAT_MESSAGES[chatId] || [];
  },

  /**
   * Send a new message.
   */
  sendMessage: async (chatId, payload) => {
    try {
      const response = await apiClient.post(`/chats/${chatId}/chat`, payload);
      return {
        id: response.data?.id || `msg-${Date.now()}`,
        sender: 'bot', // UI expects 'bot'
        text: response.data?.content || response.data?.text || "Mock response fallback",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    } catch (err) {
      console.warn("Real chat API failed or missing, using mock:", err);
      return {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        text: `Mock bot reply to: "${payload.message}". Backend might not be ready.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
  },

  /**
   * Get available AI Models.
   */
  getModels: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Real API implementation:
    // const response = await apiClient.get('/models');
    // return response.data;

    return AVAILABLE_MODELS;
  }
};
export default chatService;
