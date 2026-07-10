import { create } from 'zustand';
import { RECENT_CHATS, CHAT_MESSAGES, AVAILABLE_MODELS, CURRENT_USER } from '../dummy/dummyData';

export const useAppStore = create((set, get) => ({
  // View State (routing simulation)
  currentView: 'chat', // 'signin', 'verify', 'chat', 'map'
  setCurrentView: (view) => set({ currentView: view }),

  // Auth State
  user: CURRENT_USER,
  isLoggedIn: false,
  otpEmail: 'alex@omnibrain.ai',
  otpCode: '',
  otpTimer: 300, // 5 minutes
  timerIntervalId: null,

  setOtpCode: (code) => set({ otpCode: code }),
  startOtpTimer: () => {
    // Clear any existing timer
    const { timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);

    set({ otpTimer: 300 });
    const interval = setInterval(() => {
      const currentTimer = get().otpTimer;
      if (currentTimer > 0) {
        set({ otpTimer: currentTimer - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    set({ timerIntervalId: interval });
  },
  stopOtpTimer: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);
    set({ timerIntervalId: null });
  },
  login: () => set({ isLoggedIn: true, currentView: 'chat' }),
  logout: () => set({ isLoggedIn: false, currentView: 'signin' }),

  // Chat State
  models: AVAILABLE_MODELS,
  selectedModel: AVAILABLE_MODELS[0],
  setSelectedModel: (model) => set({ selectedModel: model }),
  recentChats: RECENT_CHATS,
  activeChatId: null, // null for welcome screen
  messages: CHAT_MESSAGES,
  chatInput: '',

  setChatInput: (input) => set({ chatInput: input }),
  setActiveChatId: (id) => set({ activeChatId: id }),
  addNewChat: () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = { id: newChatId, title: 'New Chat Workspace' };
    set((state) => ({
      recentChats: [newChat, ...state.recentChats],
      activeChatId: newChatId,
      messages: {
        ...state.messages,
        [newChatId]: []
      }
    }));
  },
  sendMessage: (text) => {
    const { activeChatId, messages } = get();
    let chatId = activeChatId;

    if (!chatId) {
      chatId = `chat-${Date.now()}`;
      const newChat = { id: chatId, title: text.length > 24 ? text.substring(0, 24) + '...' : text };
      set((state) => ({
        recentChats: [newChat, ...state.recentChats],
        activeChatId: chatId,
        messages: {
          ...state.messages,
          [chatId]: []
        }
      }));
    }

    const userMsg = { sender: 'user', text };
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), userMsg]
      },
      chatInput: ''
    }));

    // Simulated Bot Response
    setTimeout(() => {
      const botMsg = {
        sender: 'bot',
        text: `Based on your request "${text}", here is a simulated intelligent analysis from ${get().selectedModel.name}. To customize, implement the backend services using Axios hooks.`
      };
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: [...(state.messages[chatId] || []), botMsg]
        }
      }));
    }, 1000);
  },

  branchChat: (selectedText, messageIndex) => {
    const { activeChatId, messages } = get();
    if (!activeChatId) return;

    const currentMessages = messages[activeChatId] || [];
    const slicedMessages = currentMessages.slice(0, messageIndex + 1);

    const newChatId = `chat-branch-${Date.now()}`;
    const cleanTitle = selectedText.length > 20 ? selectedText.substring(0, 20) + '...' : selectedText;
    const newChat = { id: newChatId, title: `Branch: ${cleanTitle}` };

    const userMsg = { sender: 'user', text: selectedText };

    set((state) => ({
      recentChats: [newChat, ...state.recentChats],
      activeChatId: newChatId,
      messages: {
        ...state.messages,
        [newChatId]: [...slicedMessages, userMsg]
      }
    }));

    // Simulated Bot Response
    setTimeout(() => {
      const botMsg = {
        sender: 'bot',
        text: `This is a branched thread following your selected text: "${selectedText}". Let me build on the context of the previous messages to answer this question.`
      };
      set((state) => ({
        messages: {
          ...state.messages,
          [newChatId]: [...(state.messages[newChatId] || []), botMsg]
        }
      }));
    }, 1000);
  },

  branchChatInline: (selectedText, messageIndex, textUpToParagraph) => {
    const { activeChatId, messages } = get();
    if (!activeChatId) return;

    const currentMessages = messages[activeChatId] || [];
    // Slice up to messageIndex inclusive
    const slicedMessages = currentMessages.slice(0, messageIndex + 1);

    // Update the message content at messageIndex to truncate paragraphs below selection
    if (slicedMessages[messageIndex]) {
      slicedMessages[messageIndex] = {
        ...slicedMessages[messageIndex],
        text: textUpToParagraph
      };
    }

    const userMsg = { sender: 'user', text: selectedText };
    const updatedMessages = [...slicedMessages, userMsg];

    set((state) => ({
      messages: {
        ...state.messages,
        [activeChatId]: updatedMessages
      }
    }));

    // Simulated Bot Response
    setTimeout(() => {
      const botMsg = {
        sender: 'bot',
        text: `This is an inline branch from your selection: "${selectedText}". The conversation has been updated from this point.`
      };
      set((state) => ({
        messages: {
          ...state.messages,
          [activeChatId]: [...updatedMessages, botMsg]
        }
      }));
    }, 1000);
  },

  // Map state
  zoom: 92,
  panX: 0,
  panY: 0,
  searchQuery: '',
  
  setZoom: (updater) => set((state) => ({ zoom: typeof updater === 'function' ? updater(state.zoom) : updater })),
  setPan: (x, y) => set({ panX: x, panY: y }),
  setSearchQuery: (query) => set({ searchQuery: query })
}));
