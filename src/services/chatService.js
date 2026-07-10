import apiClient from './apiClient';
import { AVAILABLE_MODELS } from '../dummy/dummyData';

const formatSession = (session) => ({
  id: String(session.id),
  title: session.title,
  time: session.updated_at || session.last_message_at || session.created_at || 'Just now',
  messageCount: session.message_count || 0,
});

const formatMessage = (message) => ({
  id: String(message.id),
  sender: message.role === 'assistant' ? 'bot' : 'user',
  text: message.content,
  time: message.created_at
    ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '',
});

export const chatService = {
  /**
   * Fetch list of recent chat conversations.
   */
  getRecentChats: async () => {
    const response = await apiClient.get('/chats');
    return response.data.map(formatSession);
  },

  /**
   * Fetch all messages inside a specific chat channel.
   * @param {string} chatId
   */
  getChatMessages: async (chatId) => {
    const response = await apiClient.get(`/chats/${chatId}/messages`);
    return response.data.map(formatMessage);
  },

  /**
   * Send a new message.
   * @param {string} chatId
   * @param {string} text
   * @param {string} modelId
   */
  sendMessage: async ({ chatId, text, title }) => {
    const response = await apiClient.post('/chats/send', {
      session_id: chatId ? Number(chatId) : null,
      content: text,
      title,
    });

    return {
      session: formatSession(response.data.session),
      userMessage: formatMessage(response.data.user_message),
      assistantMessage: formatMessage(response.data.assistant_message),
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
