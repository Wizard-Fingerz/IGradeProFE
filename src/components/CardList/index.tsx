import { Box } from "@mui/material";
import ChatCard from "../ChatCard";

interface Chat {
    id: number;
    avatar: string;
    username: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    online: boolean;
}

const ChatList: React.FC = () => {
    const chats: Chat[] = [
        {
            id: 1,
            avatar: 'https://i.pravatar.cc/150?img=1',
            username: 'John Doe',
            lastMessage: 'Hey, how are you doing?',
            time: '2:15 PM',
            unreadCount: 2,
            online: true,
        },
        {
            id: 2,
            avatar: 'https://i.pravatar.cc/150?img=2',
            username: 'Jane Smith',
            lastMessage: 'Let’s catch up soon!',
            time: '1:30 PM',
            unreadCount: 0,
            online: false,
        },
        {
            id: 1,
            avatar: 'https://i.pravatar.cc/150?img=1',
            username: 'John Doe',
            lastMessage: 'Hey, how are you doing?',
            time: '2:15 PM',
            unreadCount: 2,
            online: true,
        },
        {
            id: 2,
            avatar: 'https://i.pravatar.cc/150?img=2',
            username: 'Jane Smith',
            lastMessage: 'Let’s catch up soon!',
            time: '1:30 PM',
            unreadCount: 0,
            online: false,
        },

        {
            id: 1,
            avatar: 'https://i.pravatar.cc/150?img=1',
            username: 'John Doe',
            lastMessage: 'Hey, how are you doing?',
            time: '2:15 PM',
            unreadCount: 2,
            online: true,
        },
        {
            id: 2,
            avatar: 'https://i.pravatar.cc/150?img=2',
            username: 'Jane Smith',
            lastMessage: 'Let’s catch up soon!',
            time: '1:30 PM',
            unreadCount: 0,
            online: false,
        },

        {
            id: 1,
            avatar: 'https://i.pravatar.cc/150?img=1',
            username: 'John Doe',
            lastMessage: 'Hey, how are you doing?',
            time: '2:15 PM',
            unreadCount: 2,
            online: true,
        },
        {
            id: 2,
            avatar: 'https://i.pravatar.cc/150?img=2',
            username: 'Jane Smith',
            lastMessage: 'Let’s catch up soon!',
            time: '1:30 PM',
            unreadCount: 0,
            online: false,
        },
    ];

    return (
        <Box sx={{
            maxWidth: 400, minWidth: 400,
            overflowY: 'auto', // Add this line to enable vertical scrolling
            maxHeight: '80vh',
        }}>
            {chats.map((chat) => (
                <ChatCard key={chat.id} chat={chat} />
            ))}
        </Box>
    );
};

export default ChatList;