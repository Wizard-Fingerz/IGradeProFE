import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { getProfileDetails } from '../../../../services/auth/profile';
import { User } from '../../../../types/user';
import AnalyticsCard from '../../../../components/AnalyticsCard';


const OverviewTab: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);



  const sampleVisitedNotes = ['Biology Flashcards', 'Math Chapter 2'];


  useEffect(() => {
    const fetchStudentMe = async () => {
      const response = await getProfileDetails();
      console.log(response);

      if (response) {
        setUser(response);
      }
    };
    fetchStudentMe();
  }, []);




  return (
    <>
      <Box sx={{
        mb: 6,
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      }}>

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
          <AnalyticsCard title="Total Students" count={sampleVisitedNotes.length}  />
        </Grid>
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Subjects" count={sampleVisitedNotes.length} />
        </Grid>
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Exam Graded" count={sampleVisitedNotes.length}  />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Result" count={sampleVisitedNotes.length}  />
        </Grid>
       

      </Grid>

    
    </>
  );
};

export default OverviewTab;
