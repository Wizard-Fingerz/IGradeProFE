import React from 'react';
import { Box, Typography } from '@mui/material';

interface TimerProps {
    timeLeft: number; // time left in seconds
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
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
                    Time Left
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                    {formatTime(timeLeft)}
                </Typography>
            </Box>
        </Box>
    );
};

export default Timer;
