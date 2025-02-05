import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; // To get ISO week numbers
import { useTheme } from '@mui/material/styles';

// Extend dayjs with ISO week functionality
dayjs.extend(isoWeek);

const CalendarCard = () => {
    const currentDate = dayjs(); // Current date for rendering
    const today = dayjs(); // Today's date for comparison
    const theme = useTheme(); // Access the theme to get the primary color
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Start of the month and how many days are in the current month
    const startOfMonth = currentDate.startOf('month');
    const daysInMonth = currentDate.daysInMonth();

    // Get which day of the week the month starts on (0 = Sunday, 6 = Saturday)
    const startDayIndex = startOfMonth.day();

    // Fill the array with the days of the month
    const calendarDays = [];
    for (let i = 0; i < startDayIndex; i++) {
        calendarDays.push(null); // Empty spaces for days before the start
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // Split the calendar days into weeks
    const weeks = [];
    while (calendarDays.length > 0) {
        weeks.push(calendarDays.splice(0, 7)); // Slice into weeks (7 days each)
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: 500, padding: 2, borderRadius: 3 }}>

            <Typography variant="h6" component="div" gutterBottom sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
                Calender
            </Typography>
            <CardContent>
                <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
                    {currentDate.format('MMMM YYYY')}
                </Typography>


                <Grid container spacing={1}>
                    {/* Week number column header */}
                    <Grid item xs={1}>
                        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
                            Week
                        </Typography>
                    </Grid>

                    {/* Days of the week headers */}
                    {daysOfWeek.map((day, index) => (
                        <Grid item xs={1.57} key={index}>
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{
                                    fontWeight: 'bold',
                                    color: (index === 0 || index === 6) ? theme.palette.primary.main : 'inherit',
                                }}
                            >
                                {day}
                            </Typography>
                        </Grid>
                    ))}

                    {/* Calendar weeks */}
                    {weeks.map((week, index) => {
                        // Get the ISO week number for the first day of the week
                        const firstDayOfWeek = startOfMonth.add(index, 'week');
                        const weekNumber = firstDayOfWeek.isoWeek();

                        return (
                            <React.Fragment key={index}>
                                {/* Week number cell */}
                                <Grid item xs={1}>
                                    <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
                                        {weekNumber}
                                    </Typography>
                                </Grid>

                                {/* Week days */}
                                {week.map((day, dayIndex) => {
                                    const isToday = today.date() === day && currentDate.month() === today.month();
                                    return (
                                        <Grid item xs={1.57} key={dayIndex}>
                                            <Typography
                                                variant="body2"
                                                align="center"
                                                sx={{
                                                    height: 40,
                                                    lineHeight: '40px',
                                                    backgroundColor: isToday ? theme.palette.primary.main : '#f5f5f5',
                                                    borderRadius: 2,
                                                    color: isToday
                                                        ? 'white'
                                                        : (dayIndex === 0 || dayIndex === 6)
                                                            ? theme.palette.primary.main
                                                            : 'inherit',
                                                }}
                                            >
                                                {day ? day : ''}
                                            </Typography>
                                        </Grid>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CalendarCard;
