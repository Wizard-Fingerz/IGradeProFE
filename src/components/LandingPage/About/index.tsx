import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';

// Import your images
import dashboardImage from '../../../assets/screenshots/dashboard.jpg';
import classroomImage from '../../../assets/screenshots/classroom.jpg';
import examinationImage from '../../../assets/screenshots/examination.jpg';
import notebookImage from '../../../assets/screenshots/notebook.jpg';

// Define props for each section
interface Section {
  title: string;
  description: string;
  image: string; // Path to the imported image
}

const sections: Section[] = [
  {
    title: "Dashboard",
    description: "The Dashboard is your central hub for managing your learning journey. Track your progress, view upcoming assignments, and monitor key metrics effortlessly. Get a complete overview to stay organized and on top of your educational goals.",
    image: dashboardImage,
  },
  {
    title: "Classroom",
    description: "The virtual Classroom makes learning interactive and engaging with live sessions and real-time discussions. Connect with instructors and peers for group activities. Access on-demand recordings to review materials at your convenience.",
    image: classroomImage,
  },
  {
    title: "Examination",
    description: "Our Examination system offers realistic exam conditions with timed tests and various question formats. It provides instant feedback on your performance for self-assessment. Review past exams to strengthen your weak areas and improve.",
    image: examinationImage,
  },
  {
    title: "Notebook",
    description: "Notebook allows you to effortlessly capture and organize notes during lectures. Enrich your notes with images or links for better understanding. Keep everything in one place and accessible across devices for easy study sessions.",
    image: notebookImage,
  },
];

const AboutSolution: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs')); // Adjust breakpoint for very small screens

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom align="center">
          About Our Solution
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
          Explore the key features of our solution that make learning engaging, effective, and seamless.
        </Typography>
      </Grid>

      {sections.map((section, index) => (
        <Grid
          item
          xs={12}
          key={index}
          container
          direction={isSmallScreen ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse')}
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                image={section.image}
                alt={section.title}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: isSmallScreen ? 200 : 'auto',
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant={isSmallScreen ? "h6" : "h5"} gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {section.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default AboutSolution;
