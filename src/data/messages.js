export const MOCK_MESSAGES = {
  'chat-architecture': [
    {
      id: 'msg-user-1',
      sender: 'user',
      text: 'Explain the overall architecture of this project.',
      time: '10:30 AM'
    },
    {
      id: 'msg-bot-1',
      sender: 'bot',
      text: `Based on the documents and resources you've connected, here's the overall architecture of the project:

### High-Level Architecture Overview

This is a modern full-stack application with a microservices-oriented architecture built on **React**, **FastAPI**, and **PostgreSQL** and deployed on **Google Cloud Platform**.

### Key Components:

*   **Frontend**: React + TypeScript application with component-based architecture
*   **Backend**: FastAPI RESTful services with async support
*   **Database**: PostgreSQL with pgvector extension for AI embeddings
*   **Storage**: Google Drive integration for document management
*   **Authentication**: Google OAuth 2.0 with JWT tokens
*   **AI/ML**: Gemini AI for embeddings and chat completions`,
      time: '10:31 AM'
    }
  ],
  'chat-sales': [
    {
      id: 'msg-user-2',
      sender: 'user',
      text: 'What were the key takeaways for Q4 sales?',
      time: '2:15 PM'
    },
    {
      id: 'msg-bot-2',
      sender: 'bot',
      text: 'Q4 sales showed a 15% increase quarter-over-quarter, mainly driven by enterprise cloud services integration and automation suites.',
      time: '2:16 PM'
    }
  ]
};
export default MOCK_MESSAGES;
