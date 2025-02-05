import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import { getProfileDetails } from '../../../../services/auth/profile';
import { User } from '../../../../types/user';

const ProfileTab: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchStudentMe = async () => {
      try {
        const response = await getProfileDetails();
        if (response) {
          setUser(response); // Ensure this directly sets the API response
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchStudentMe();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Avatar
                src={user.profile_picture || ''}
                alt={`${user.first_name || ''} ${user.last_name || ''}`}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4">{`${user.first_name || 'N/A'} ${user.last_name || 'N/A'}`}</Typography>
              <Typography variant="h6" color="textSecondary">
                Username: {user.username || 'N/A'}
              </Typography>
              <Typography variant="body1">Email: {user.email || 'N/A'}</Typography>
              <Typography variant="body2">
                Date Joined: {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}
              </Typography>
              <Typography variant="body2">
                Last Login: {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never logged in'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileTab;
