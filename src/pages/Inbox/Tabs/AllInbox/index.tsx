import React from 'react';
import { Box } from '@mui/material'
import ChatScreen from '../../../../components/ChatScreen';
import ChatList from '../../../../components/CardList';

const AllInbox: React.FC = () => {
  return (
    <>
      <Box sx={{
        borderRadius: 2,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexWrap: 'wrap', // or 'nowrap' depending on your desired layout
      }}>
        <ChatList />
        <ChatScreen />
      </Box>
    </>
  );
};

export default AllInbox;