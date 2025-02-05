import React from 'react';
import { Box, Grid, Typography, Link, IconButton, Button } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

// Import store badges (replace with actual paths to your images)
import googlePlayBadge from '../../../assets/store-badges/googleplay.png';
import appStoreBadge from '../../../assets/store-badges/appstore.png';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 20px',
        mt: 5,
      }}
    >
      <Grid container spacing={4}>
        {/* Company Info */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            IGradePro
          </Typography>
          <Typography variant="body2" color="inherit">
            Empowering education through technology. Our platform helps learners and educators connect, collaborate, and achieve their learning goals.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
          </Box>
          <Box>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Box>
          <Box>
            <Link href="/privacy-policy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
          <Box>
            <Link href="/terms" color="inherit" underline="hover">
              Terms & Conditions
            </Link>
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" color="inherit">
            123 Learning Street, Education City, Country
          </Typography>
          <Typography variant="body2" color="inherit">
            Email: adewale.oladiti28@gmail.com
          </Typography>
          <Typography variant="body2" color="inherit">
            Phone: +234 706 760 2193
          </Typography>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook" sx={{ color: '#fff' }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter" sx={{ color: '#fff' }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" aria-label="LinkedIn" sx={{ color: '#fff' }}>
              <LinkedIn />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram" sx={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        {/* Get Our App */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Get Our App
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
            Download our app to access all features directly from your mobile device.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component="a" href="https://play.google.com/store" target="_blank">
              <img src={googlePlayBadge} alt="Get it on Google Play" style={{ width: 150 }} />
            </Button>
            <Button component="a" href="https://www.apple.com/app-store/" target="_blank">
              <img src={appStoreBadge} alt="Download on the App Store" style={{ width: 150 }} />
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} IGradePro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
