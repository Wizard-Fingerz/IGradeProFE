// ChatScreen.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import MessageList from '../MessageList';
import TypingIndicator from '../TypingIndicator';
import MessageInput from '../MessageInput';
import ChatHeader from '../ChatHeader';

interface Message {
  id: number;
  text: string;
  isSender: boolean;
  avatar: string;
  timestamp: string;
  file?: File; // Add this line
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 3000); // Stop typing indicator after 3 seconds
  };

  const handleSend = (message: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: message,
      isSender: true,
      avatar: '', // Set the avatar URL for the sender if needed
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleAttachFile = (file: File) => {
    const newMessage: Message = {
      id: Date.now(),
      text: '', // No text, just a file attachment
      isSender: true,
      avatar: '', // Set the avatar URL for the sender if needed
      timestamp: new Date().toLocaleTimeString(),
      file: file, // Add the file to the message object
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <Box
      sx={{
        width: '50vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Chat Header (Top widget with avatar, name, and icons) */}
      <ChatHeader
        avatarUrl="https://example.com/avatar.jpg" // Example avatar URL
        name="John Doe"
        onVideoCall={() => console.log('Start video call')}
        onVoiceCall={() => console.log('Start voice call')}
        onSettings={() => console.log('Open settings')}
      />

      {/* Message List */}
      <MessageList messages={messages} />

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Message Input */}
      <MessageInput
        onSend={handleSend}
        onTyping={handleTyping}
        onAttachFile={handleAttachFile}
      />
    </Box>
  );
};
export default ChatScreen;
