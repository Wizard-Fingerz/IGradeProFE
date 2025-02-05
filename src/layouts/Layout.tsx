import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar/SideBar';

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Use breakpoints for responsiveness
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile); // Initialize isSidebarOpen to false on mobile screens

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Box display="flex">
      {/* Sidebar will be displayed only on larger screens */}
      {!isMobile && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: isMobile ? 0 : (isSidebarOpen ? '256px' : '64px'), // Set marginLeft to 0 on mobile, adjust for desktop
         
          transition: 'margin-left 0.3s ease',
        }}
      >
      
        <Box
          component="main"
          sx={{
            paddingTop: 0,
            padding: 3,
            width: isMobile ? '100%' : (isSidebarOpen ? '80vw' : '95vw'), // Set width to 100% on mobile, adjust for desktop
          }}
        >
          <Outlet /> {/* This is where nested routes will render */}
        </Box>

      </Box>
    </Box>
  );
};

export default Layout;
