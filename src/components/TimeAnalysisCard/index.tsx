import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TooltipItem } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Define the months manually
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate random data for a single category
const generateRandomData = (maxValue: number) => Math.floor(Math.random() * maxValue);

// Generate data for a single month
const generateMonthlyData = (maxHoursInMonth: number) => Array(3).fill(0).map(() => generateRandomData(maxHoursInMonth));

// Generate data for all 12 months
const generateLargeData = () => {
    const maxHoursInMonth = 744; // Maximum hours in a month (31 days * 24 hours)
    return {
        studyHours: months.map(() => generateMonthlyData(maxHoursInMonth)),
        leisureHours: months.map(() => generateMonthlyData(maxHoursInMonth)),
        examHours: months.map(() => generateMonthlyData(maxHoursInMonth)),
    };
};

// Define the chart data and options
const chartData = (data: any) => ({
    labels: months,
    datasets: [
        {
            label: 'Study',
            data: data.studyHours,
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            borderWidth: 1,
        },
        {
            label: 'Leisure',
            data: data.leisureHours,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1,
        },
        {
            label: 'Practice Exam',
            data: data.examHours,
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            borderWidth: 1,
        },
    ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: TooltipItem<'bar'>) => `${tooltipItem.dataset.label}: ${tooltipItem.raw} hours`,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
      },
      ticks: {
        stepSize: 1, // Display labels in increments of 1
        min: 0, // Start from 0
        max: 11, // End at 11 (since you have 12 months)
      },
    },
    y: {
      title: {
        display: true,
        text: 'Hours',
      },
      min: 0,
      max: 744,
      ticks: {
        stepSize: 60,
      },
      beginAtZero: true,
    },
  },
};

const TimeAnalysisCard = () => {
    const data = generateLargeData();

    return (
        <Card sx={{ padding: 2, borderRadius: 3 }}>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                Time Analysis
            </Typography>
            <CardContent>
                <div style={{ marginTop: 20 }}>
                    <Bar data={chartData(data)} options={chartOptions} 
                    style={{ height: '300px' }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default TimeAnalysisCard;