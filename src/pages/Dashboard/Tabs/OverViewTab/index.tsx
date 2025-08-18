import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { fetchDashboardAnalytics, getProfileDetails } from '../../../../services/auth/profile';
import { User } from '../../../../types/user';
import AnalyticsCard from '../../../../components/AnalyticsCard';



const OverviewTab: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    totalExamsGraded: 0,
    totalResults: 0,
  });

  useEffect(() => {
    const fetchStudentMe = async () => {
      const response = await getProfileDetails();
      if (response) {
        setUser(response);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const response = await fetchDashboardAnalytics(); // Call the analytics API
        setAnalytics({
          totalStudents: response.total_students || 0,
          totalSubjects: response.total_subjects || 0,
          totalExamsGraded: response.total_exam_graded || 0,
          totalResults: response.total_results || 0,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchStudentMe();
    fetchAnalytics();
  }, []);

  return (
    <>
      <Box
        sx={{
          mb: 6,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h2" component="h2" sx={{ fontSize: 24, fontWeight: 'bold' }}>
          Welcome, {user?.username} 🎉
        </Typography>
        <Typography variant="body1" component="p" sx={{ color: 'gray' }}>
          Here is what is happening in your IGradePro account today
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 5 }}>
        {/* Analytics Cards */}
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Candidates" count={analytics.totalStudents} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Subjects" count={analytics.totalSubjects} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Exams Graded" count={analytics.totalExamsGraded} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Results" count={analytics.totalResults} />
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewTab;