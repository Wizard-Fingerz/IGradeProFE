import React from 'react';
import { Card, CardContent, Typography, AvatarGroup, Avatar, Box, Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TodayPlanCard: React.FC = () => {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card sx={{ minWidth: 275, maxWidth: 30, padding: 2, borderRadius: 3 }}>
      <CardContent>
        {/* Date and Add Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'gray' }}>
            {date}
          </Typography>
          <IconButton>
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        </Box>

        {/* Main Title: Today's Plan */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          Cell and its Environment
        </Typography>

        {/* Event Info with Avatars */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AvatarGroup max={4}>
            <Avatar alt="User 1" src="https://via.placeholder.com/40" />
            <Avatar alt="User 2" src="https://via.placeholder.com/40" />
            <Avatar alt="User 3" src="https://via.placeholder.com/40" />
            <Avatar alt="User 4" src="https://via.placeholder.com/40" />
          </AvatarGroup>
          <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
            +50
          </Typography>
        </Box>

        {/* Event Time */}
        <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
          Biology with Alfred: 11:00 AM - 12:00 PM
        </Typography>

        {/* Weekly Report Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" sx={{ borderRadius: 8, textTransform: 'none' }}>
            View Report
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodayPlanCard;
