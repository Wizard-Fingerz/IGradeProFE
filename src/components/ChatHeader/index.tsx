// ChatHeader.tsx
import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import SettingsIcon from '@mui/icons-material/Settings';

interface ChatHeaderProps {
  avatarUrl: string;
  name: string;
  onVideoCall: () => void;
  onVoiceCall: () => void;
  onSettings: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ avatarUrl, name, onVideoCall, onVoiceCall, onSettings }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #E0E0E0',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Avatar */}
        <Avatar src={avatarUrl} alt={name} />

        {/* Name */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        {/* Video Call Icon */}
        <IconButton onClick={onVideoCall}>
          <VideocamIcon />
        </IconButton>

        {/* Voice Call Icon */}
        <IconButton onClick={onVoiceCall}>
          <CallIcon />
        </IconButton>

        {/* Settings Icon */}
        <IconButton onClick={onSettings}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatHeader;
