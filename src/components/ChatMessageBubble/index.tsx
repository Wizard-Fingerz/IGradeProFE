import React from 'react';
import { Box, Typography, Avatar, useTheme } from '@mui/material';

interface MessageBubbleProps {
  text: string;
  isSender: boolean;
  avatar: string;
  timestamp: string;
  senderColor?: string;  // Custom color for sender
  receiverColor?: string; // Custom color for receiver
  senderTextColor?: string; // Custom text color for sender
  receiverTextColor?: string; // Custom text color for receiver
  file?: any; // Add this line
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isSender,
  avatar,
  timestamp, // Default receiver text color
  file,
}) => {
  const theme = useTheme();

  // Split the timestamp into hours, minutes, and seconds
  const [time, period] = timestamp.split(' ');
  const [hours, minutes, seconds] = time.split(':');

  // Create a new Date object with the current date and the parsed time
  const dateObj = new Date();
  dateObj.setHours(period === 'PM' ? parseInt(hours) + 12 : parseInt(hours));
  dateObj.setMinutes(parseInt(minutes));
  dateObj.setSeconds(parseInt(seconds));

  // Format the timestamp
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  console.log("Timestamp:", timestamp);
  console.log("Formatted Time:", formattedTime);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isSender ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        marginBottom: 2,
      }}
    >
      {!isSender && (
        <Avatar alt="User Avatar" src={avatar} sx={{ width: 32, height: 32, marginRight: 1 }} />
      )}
      <Box
        sx={{
          backgroundColor: isSender ? theme.palette.primary.main : theme.palette.background.paper,
          color: isSender ? theme.palette.primary.contrastText : theme.palette.text.primary,
          padding: '10px 15px',
          borderRadius: '15px',
          maxWidth: '75%',
          wordWrap: 'break-word',
          overflow: 'hidden',
        }}
      >
        {text && <Typography variant="body1">{text}</Typography>}
        {file && (
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              Attached file: {file.name}
            </Typography>

            {/* You can also display a file preview or icon here */}
          </Box>
        )}
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', marginTop: 0.5 }}>
          {formattedTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;