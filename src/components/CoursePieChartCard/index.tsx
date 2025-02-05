import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Props type for course data
type Subjectstatus = {
    completed: number;
    incomplete: number;
    pending: number;
};

interface PieChartCardProps {
    data: Subjectstatus;
}

const PieChartCard: React.FC<PieChartCardProps> = ({ data }) => {
    // Pie chart data and options
    const pieData = {
        labels: ['Completed', 'Incomplete', 'Pending'],
        datasets: [
            {
                label: 'Course Progress',
                data: [data.completed, data.incomplete, data.pending],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336'], // Customize colors
                hoverBackgroundColor: ['#66bb6a', '#ffb74d', '#e57373'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Card sx={{ minWidth: 320, maxWidth: 500, padding: 2, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
                    Course Completion Status
                </Typography>
                <Box sx={{ height: 250 }}>
                    <Pie data={pieData} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default PieChartCard;
