import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import UserMessageCard from './UserMessageCard';
import AssistantMessageCard from './AssistantMessageCard';

const ChatMessageList = ({ messages = [] }) => {
  const listEndRef = useRef(null);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3.5,
        maxWidth: '896px',
        width: '100%',
        mx: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {messages.map((msg) => (
        <Box key={msg.id}>
          {msg.sender === 'user' ? (
            <UserMessageCard text={msg.text} time={msg.time} />
          ) : (
            <AssistantMessageCard text={msg.text} isStreaming={msg.isStreaming} />
          )}
        </Box>
      ))}
      <div ref={listEndRef} />
    </Box>
  );
};

export default ChatMessageList;
