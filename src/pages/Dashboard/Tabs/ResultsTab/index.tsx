import React from 'react';
import { Box } from '@mui/material';
import Card from '../../../../components/Card/Card';

const ResultsTab: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card
        title="Exam Results"
        description="This is a summary of your exam results."
        imageUrl="https://via.placeholder.com/350x200"
        footer={<button>View Details</button>}
      />
      {/* Add more result cards as needed */}
    </Box>
  );
};

export default ResultsTab;
