import { create } from 'zustand';
import MOCK_CHATS from '../data/chats';
import MOCK_MESSAGES from '../data/messages';

export const useChatStore = create((set, get) => ({
  chats: MOCK_CHATS,
  messages: MOCK_MESSAGES,
  activeChatId: 'chat-architecture',
  chatInput: '',
  uploadedAttachments: [],
  activeRoute: 'chat', // 'chat' or 'documents'

  setActiveRoute: (route) => set({ activeRoute: route }),
  setActiveChatId: (id) => set({ activeChatId: id, activeRoute: 'chat' }),
  setChatInput: (input) => set({ chatInput: input }),

  renameChat: (chatId, newTitle) => set((state) => ({
    chats: state.chats.map((c) => c.id === chatId ? { ...c, title: newTitle } : c)
  })),

  addNewChat: () => {
    const newId = `chat-${Date.now()}`;
    const newChat = { id: newId, title: 'New Chat Workspace', time: 'Just now' };
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: newId,
      activeRoute: 'chat',
      messages: {
        ...state.messages,
        [newId]: []
      }
    }));
  },

  sendMessage: async (text) => {
    const { activeChatId, messages } = get();
    if (!activeChatId) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentChatMsgs = messages[activeChatId] || [];
    const updatedMessages = [...currentChatMsgs, userMsg];

    set((state) => ({
      messages: {
        ...state.messages,
        [activeChatId]: updatedMessages
      },
      chatInput: '',
      uploadedAttachments: [] // Clear composer attachments on send
    }));

    // Import sourceStore dynamically to avoid circular dependencies
    const { useSourceStore } = await import('./sourceStore');
    const sourceState = useSourceStore.getState();

    const payload = {
      message: text,
      content: text,
      use_global_documents: sourceState.globalDocumentsEnabled,
      use_chat_documents: sourceState.chatDocumentsFolderEnabled,
      use_google_drive: sourceState.googleDriveEnabled,
      use_jira: sourceState.jiraEnabled,
      use_github: sourceState.githubEnabled,
      selected_file_ids: sourceState.getSelectedFileIds(),
      selected_folder_ids: []
    };

    const { chatService } = await import('../services/chatService');
    const botResponse = await chatService.sendMessage(activeChatId, payload);

    set((state) => ({
      messages: {
        ...state.messages,
        [activeChatId]: [...(state.messages[activeChatId] || []), botResponse]
      }
    }));
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
