import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Grid } from '@mui/material';

// Define the types for the course and the props
interface Course {
  title: string;
  progress: number;
}

interface ProgressBarCardProps {
  Subjects: Course[];
}

const ProgressBarCard: React.FC<ProgressBarCardProps> = ({ Subjects }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 30, padding: 2 ,  borderRadius: 3}}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
          Completed Subjects
        </Typography>

        <Grid container spacing={2}>
          {Subjects.map((course, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {course.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {course.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={course.progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f5f5f5',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProgressBarCard;
