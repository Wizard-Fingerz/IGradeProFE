// TypingIndicator.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const TypingIndicator: React.FC = () => {
  return (
    <Box sx={{ padding: '10px', textAlign: 'center' }}>
      <Typography variant="caption">Someone is typing...</Typography>
    </Box>
  );
};

export default TypingIndicator;
