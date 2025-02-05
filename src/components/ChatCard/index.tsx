import { Avatar, Box, Typography, Badge } from '@mui/material';

// Define the type for chat data
interface Chat {
  id: number;
  avatar: string;
  username: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online: boolean;
}

// Props type for ChatCard component
interface ChatCardProps {
  chat: Chat;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  const { avatar, username, lastMessage, time, unreadCount, online } = chat;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #e0e0e0',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      {/* Avatar and online status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar src={avatar} alt={username} sx={{ width: 48, height: 48 }} />
          {online && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                backgroundColor: 'green',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            />
          )}
        </Box>

        {/* Chat details */}
        <Box>
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
            {username}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#757575',
              maxWidth: 240,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {lastMessage}
          </Typography>
        </Box>
      </Box>

      {/* Timestamp and unread badge */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
          {time}
        </Typography>
        {unreadCount > 0 && (
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{ fontWeight: 'bold', marginTop: '5px' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ChatCard;