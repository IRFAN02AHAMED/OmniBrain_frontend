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
   * @param {string} chatId
   * @param {string} text
   * @param {string} modelId
   */
  sendMessage: async (chatId, text, modelId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Real API implementation:
    // const response = await apiClient.post(`/chats/${chatId}/messages`, { text, modelId });
    // return response.data;

    return {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      text: `Mock bot reply to: "${text}" via ${modelId}`,
      timestamp: new Date().toISOString()
    };
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
