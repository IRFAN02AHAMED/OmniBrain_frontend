import { create } from 'zustand';
import chatService from '../services/chatService';

export const useChatStore = create((set, get) => ({
  chats: [],
  messages: {},
  activeChatId: null,
  chatInput: '',
  uploadedAttachments: [],
  activeRoute: 'chat', // 'chat' or 'documents'
  loadingChats: false,
  sendingMessage: false,
  chatError: null,

  setActiveRoute: (route) => set({ activeRoute: route }),
  setActiveChatId: (id) => set({ activeChatId: id, activeRoute: 'chat' }),
  setChatInput: (input) => set({ chatInput: input }),
  setChatError: (chatError) => set({ chatError }),

  renameChat: (chatId, newTitle) => set((state) => ({
    chats: state.chats.map((c) => c.id === chatId ? { ...c, title: newTitle } : c)
  })),

  addNewChat: () => {
    set({
      activeChatId: null,
      activeRoute: 'chat',
      chatInput: '',
      uploadedAttachments: [],
    });
  },

  loadChats: async () => {
    set({ loadingChats: true, chatError: null });
    try {
      const chats = await chatService.getRecentChats();
      set({ chats });
    } catch (error) {
      set({ chatError: error?.response?.data?.detail || error.message || 'Failed to load chats.' });
    } finally {
      set({ loadingChats: false });
    }
  },

  loadMessages: async (chatId) => {
    if (!chatId) return;
    set({ chatError: null });
    try {
      const chatMessages = await chatService.getChatMessages(chatId);
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: chatMessages,
        },
      }));
    } catch (error) {
      set({ chatError: error?.response?.data?.detail || error.message || 'Failed to load messages.' });
    }
  },

  sendMessage: async (text) => {
    const trimmedText = (text || '').trim();
    if (!trimmedText) return;

    const { activeChatId } = get();
    set({ sendingMessage: true, chatError: null });

    try {
      const response = await chatService.sendMessage({
        chatId: activeChatId,
        text: trimmedText,
        title: trimmedText.length > 50 ? `${trimmedText.slice(0, 50)}...` : trimmedText,
      });

      set((state) => {
        const sessionId = response.session.id;
        const existingChat = state.chats.find((chat) => chat.id === sessionId);
        const chats = existingChat
          ? state.chats.map((chat) => (chat.id === sessionId ? response.session : chat))
          : [response.session, ...state.chats];

        return {
          chats,
          activeChatId: sessionId,
          messages: {
            ...state.messages,
            [sessionId]: [
              ...(state.messages[sessionId] || []),
              response.userMessage,
              response.assistantMessage,
            ],
          },
          chatInput: '',
          uploadedAttachments: [],
        };
      });
    } catch (error) {
      set({ chatError: error?.response?.data?.detail || error.message || 'Failed to send message.' });
    } finally {
      set({ sendingMessage: false });
    }
  },

  addAttachments: (files) => set((state) => ({
    uploadedAttachments: [
      ...state.uploadedAttachments,
      ...files.map((file) => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        status: 'completed'
      }))
    ]
  })),

  removeAttachment: (id) => set((state) => ({
    uploadedAttachments: state.uploadedAttachments.filter((f) => f.id !== id)
  })),

  clearAttachments: () => set({ uploadedAttachments: [] }),
}));
export default useChatStore;
