import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const TimeSpent: React.FC = () => {
    const [timeSpent, setTimeSpent] = useState(0); // time spent in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Box sx={{ bgcolor: 'grey.200', p: 3, borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                Time Tracker
            </Typography>
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Time Spent
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {formatTime(timeSpent)}
                </Typography>
            </Box>
        </Box>
    );
};

export default TimeSpent;
