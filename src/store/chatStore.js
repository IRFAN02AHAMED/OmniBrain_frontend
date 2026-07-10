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
      const pendingAssistantId = `pending-${Date.now()}`;
      let streamedSessionId = activeChatId;

      await chatService.streamMessage({
        chatId: activeChatId,
        text: trimmedText,
        title: trimmedText.length > 50 ? `${trimmedText.slice(0, 50)}...` : trimmedText,
        onEvent: (event) => {
          if (event.type === 'session') {
            const response = {
              session: event.session,
              userMessage: {
                id: String(event.user_message.id),
                sender: 'user',
                text: event.user_message.content,
                time: event.user_message.created_at
                  ? new Date(event.user_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : '',
              },
            };
            streamedSessionId = String(response.session.id);

            set((state) => {
              const existingChat = state.chats.find((chat) => chat.id === streamedSessionId);
              const formattedSession = {
                id: String(response.session.id),
                title: response.session.title,
                time: response.session.updated_at || response.session.last_message_at || response.session.created_at || 'Just now',
                messageCount: response.session.message_count || 0,
              };
              const chats = existingChat
                ? state.chats.map((chat) => (chat.id === streamedSessionId ? formattedSession : chat))
                : [formattedSession, ...state.chats];

              return {
                chats,
                activeChatId: streamedSessionId,
                messages: {
                  ...state.messages,
                  [streamedSessionId]: [
                    ...(state.messages[streamedSessionId] || []),
                    response.userMessage,
                    {
                      id: pendingAssistantId,
                      sender: 'bot',
                      text: '',
                      time: '',
                      isStreaming: true,
                    },
                  ],
                },
                chatInput: '',
                uploadedAttachments: [],
              };
            });
          }

          if (event.type === 'delta' && streamedSessionId) {
            set((state) => ({
              messages: {
                ...state.messages,
                [streamedSessionId]: (state.messages[streamedSessionId] || []).map((message) =>
                  message.id === pendingAssistantId
                    ? { ...message, text: `${message.text}${event.content}` }
                    : message
                ),
              },
            }));
          }

          if (event.type === 'done' && streamedSessionId) {
            set((state) => ({
              messages: {
                ...state.messages,
                [streamedSessionId]: (state.messages[streamedSessionId] || []).map((message) =>
                  message.id === pendingAssistantId
                    ? {
                        id: String(event.assistant_message.id),
                        sender: 'bot',
                        text: event.assistant_message.content,
                        time: event.assistant_message.created_at
                          ? new Date(event.assistant_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : '',
                      }
                    : message
                ),
              },
            }));
          }
        },
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
