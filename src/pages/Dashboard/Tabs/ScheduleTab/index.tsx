import React from 'react';
import { Box } from '@mui/material';
import Card from '../../../../components/Card/Card';


const ScheduleTab: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card
        title="User Profile"
        description="This is the profile card for John Doe."
        imageUrl="https://via.placeholder.com/350x200"
      >
        <p>Email: john.doe@example.com</p>
        <p>Role: Admin</p>
      </Card>
    </Box>
  );
};

export default ScheduleTab;
