import React from 'react';
import { Grid, Typography, Avatar, Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

// Import team images
import teamMember1 from '../../../assets/team/teamMember.jpg';
import teamMember2 from '../../../assets/team/teamMember.jpg';
import teamMember3 from '../../../assets/team/teamMember.jpg';
import teamMember4 from '../../../assets/team/teamMember.jpg';

// Define props for each team member
interface TeamMember {
  name: string;
  title: string;
  image: string; // Path to the imported image
}

const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    image: teamMember1,
  },
  {
    name: "Jane Smith",
    title: "Chief Technology Officer",
    image: teamMember2,
  },
  {
    name: "Samuel Johnson",
    title: "Lead Designer",
    image: teamMember3,
  },
  {
    name: "Emily Davis",
    title: "Head of Marketing",
    image: teamMember4,
  },
];

const OurTeam: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom align="center">
        Meet Our Team
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        Our talented team is committed to helping you succeed.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={member.name}
              src={member.image}
              sx={{
                width: isSmallScreen ? 100 : 150,
                height: isSmallScreen ? 100 : 150,
                margin: '0 auto',
                marginBottom: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              {member.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {member.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurTeam;
