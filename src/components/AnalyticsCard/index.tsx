// AnalyticsCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface AnalyticsCardProps {
  title: string;
  count: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, count }) => {
    return (
      <Card>
        <CardContent sx={{ position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
         
          </Box>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{count}</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

export default AnalyticsCard;
