// MessageList.tsx
import React from 'react';
import { Box } from '@mui/material';
import MessageBubble from '../ChatMessageBubble';

interface Message {
  id: number;
  text: string;
  isSender: boolean;
  avatar: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 150px)',
        overflowY: 'auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          isSender={msg.isSender}
          avatar={msg.avatar}
          timestamp={msg.timestamp}
        />
      ))}
    </Box>
  );
};

export default MessageList;
