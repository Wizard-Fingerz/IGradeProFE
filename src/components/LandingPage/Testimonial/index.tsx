import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar } from '@mui/material';

// Import testimonials avatars (replace with actual paths to your images)
import user1Avatar from '../../../assets/testimonials/user1.jpg';
import user2Avatar from '../../../assets/testimonials/user1.jpg';
import user3Avatar from '../../../assets/testimonials/user1.jpg';
import user4Avatar from '../../../assets/testimonials/user1.jpg';

// Define props for each testimonial
interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatar: string; // Path to the imported image
}

const testimonials: Testimonial[] = [
  {
    name: "Michael Thompson",
    title: "Student",
    quote: "This platform has made my learning journey so much easier. The classroom interaction and easy access to materials are phenomenal!",
    avatar: user1Avatar,
  },
  {
    name: "Sarah Johnson",
    title: "Instructor",
    quote: "As an instructor, I find the tools here intuitive and powerful. The ability to interact with students in real-time has been a game-changer.",
    avatar: user2Avatar,
  },
  {
    name: "Emily Wilson",
    title: "Parent",
    quote: "I love how I can easily monitor my child's progress through the Dashboard. It's user-friendly and provides all the information I need.",
    avatar: user3Avatar,
  },
  {
    name: "James Carter",
    title: "Developer",
    quote: "The Examination and Notebook features are incredibly well-designed. They make studying and evaluating performance much more effective.",
    avatar: user4Avatar,
  },
];

const Testimonials: React.FC = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f3f3f3' }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Users Are Saying
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        Hear from our community about how our solution has impacted their lives.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', padding: 2 }}>
              <Avatar
                alt={testimonial.name}
                src={testimonial.avatar}
                sx={{ width: 80, height: 80, margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
                  "{testimonial.quote}"
                </Typography>
                <Typography variant="h6" component="div">
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
