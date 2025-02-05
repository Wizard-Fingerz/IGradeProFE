import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import OverviewTab from './Tabs/OverViewTab';
import CustomInput from '../../components/CustomBorderedInput';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);



  useEffect(() => {
    const fetchStudentMe = async () => {
      const response = await getProfileDetails();
      if (response) {
        setUser(response);
      }
    };
    fetchStudentMe();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: { xs: 2, md: 0 }, // Margin bottom on small screens
          }}
        >
          Overview
        </Typography>

        <Box sx={
          {
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
            justifyContent: 'space-between',

          }
        }>
          <CustomInput />

          <div className="top-navbar-icons">
            <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
          </div>

        </Box>


      </Box>

      <Box sx={{ padding: 2 }}>
        <OverviewTab />
      </Box>
    </Box>
  );
};

export default Dashboard;
