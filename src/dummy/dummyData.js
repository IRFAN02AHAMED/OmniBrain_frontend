export const CURRENT_USER = {
  name: 'Alex Rivera',
  plan: 'Pro Plan',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXmH2XmvX2MbV7qlAwWi_EB4LaiZKhHBtQxz6A7EB3frH4rSezwJ8IpV3DW_ana8tFxDfi_PJFvtK87NNdMHTRE6bcD8cRIxHQ55WG6vPxlrvVz-g9HoGkW15arHxnqLHk2v3KH0kpCPBH1oIjCd7K7U57p2KNFXT6ChEpsI0KZu0PohQnifxogwyZFB2agKDqQaalbum-SGaih7oDBT5K0m6heP49U8yt-G9YxkvV78_zmtEziaxxC91rbdyb-ZGKfMP0Yfz3gVo',
};

export const AVAILABLE_MODELS = [
  { id: 'omni-4-ultra', name: 'Omni-4 Ultra', active: true },
  { id: 'omni-4-flash', name: 'Omni-4 Flash', active: false },
  { id: 'omni-3-pro', name: 'Omni-3 Pro', active: false },
];

export const RECENT_CHATS = [
  { id: 'chat-1', title: 'Luminous Design Ethos' },
  { id: 'chat-2', title: 'Atmospheric Palette Logic' },
  { id: 'chat-3', title: 'UI/UX Strategy 2024' },
];

export const CHAT_MESSAGES = {
  'chat-1': [
    { sender: 'user', text: 'How can we incorporate luminous mint and peach colors in our UI design?' },
    { sender: 'bot', text: 'To achieve a luminous, high-key aesthetic: \n1. Use semi-transparent white containers (glassmorphism) over light mint/peach mesh gradients.\n2. Ensure high contrast text using rich dark colors (e.g., deep charcoal `#191c1c` instead of pure black).\n3. Keep cards clean with micro-shadows and subtle inner borders (`rgba(255,255,255,0.6)`).' }
  ],
  'chat-2': [
    { sender: 'user', text: 'What is atmospheric palette logic?' },
    { sender: 'bot', text: 'Atmospheric palette logic uses soft background blobs with extreme blur filters (80px+) and low opacity to give the interface a natural, airy, and premium feeling. It mirrors modern dark/light mode practices by setting localized background elements to shift subtly depending on cursor movement.' }
  ],
  'chat-3': [
    { sender: 'user', text: 'Tell me about UI/UX strategy for 2024.' },
    { sender: 'bot', text: 'The 2024 strategy highlights dynamic micro-interactions, responsive design canvases, progressive disclosure of info, and fluid navigation paths (like drag-and-pan knowledge boards).' }
  ]
};

export const KNOWLEDGE_MAP_NODES = {
  root: {
    id: 'root',
    title: 'Web Evolution',
    category: 'Root Concept',
    description: 'The transition from static pages to decentralized intelligent environments.',
    x: 50,
    y: 400
  },
  level1: [
    {
      id: 'web1',
      title: 'Web 1.0: Read-Only',
      description: 'The era of the hyperlink and static information hubs.',
      x: 700,
      y: 170
    },
    {
      id: 'web2',
      title: 'Web 2.0: Social Web',
      description: 'User-generated content and centralized platforms.',
      x: 700,
      y: 420
    },
    {
      id: 'web3',
      title: 'Web 3.0: Semantic',
      description: 'Decentralization, AI integration, and ownership.',
      x: 700,
      y: 670
    }
  ],
  level2: [
    {
      id: 'mosaic',
      parentId: 'web1',
      title: 'Mosaic Browser',
      description: 'First widely used graphical web browser.',
      x: 1080,
      y: 150
    },
    {
      id: 'directories',
      parentId: 'web1',
      title: 'Directory Structures',
      description: 'Yahoo style hierarchical information links.',
      x: 1080,
      y: 280
    }
  ]
};
