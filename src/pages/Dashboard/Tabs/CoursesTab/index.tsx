import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CalendarCard from '../../../../components/CalenderCard';
import PieChartCard from '../../../../components/CoursePieChartCard';
import ProgressBarCard from '../../../../components/CourseProgressCard';
import TodayPlanCard from '../../../../components/TodayPlanCard';
import { getProfileDetails } from '../../../../services/auth/profile';
import { User } from '../../../../types/user';


// Example Subjects data (you can replace this with real data from props or state)
const Subjects = [
  { title: 'Math 101', progress: 70 },
  { title: 'Science 202', progress: 45 },
  { title: 'History 303', progress: 90 },
  { title: 'English Literature', progress: 80 }
];


// Example course status data (replace with actual data)
const Subjectstatus = {
  completed: 3,
  incomplete: 1,
  pending: 1,
};


const SubjectsTab: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);


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
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h2" component="h2" sx={{ fontSize: 24, fontWeight: 'bold' }}>
          Welcome, {user?.user?.first_name} 🎉
        </Typography>
        <Typography variant="body1" component="p" sx={{ color: 'gray' }}>
          Here is what is happening in your IGradePro account today
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>

        {/* Pie chart showing course completion status */}
        <PieChartCard data={Subjectstatus} />

        {/* Pass the Subjects data to ProgressBarCard */}
        <ProgressBarCard Subjects={Subjects} />

        {/* Today's Plan Card */}
        <TodayPlanCard />



        {/* Include the CalendarCard component */}
        <CalendarCard />
      </Box>
    </>

  );
};

export default SubjectsTab;
