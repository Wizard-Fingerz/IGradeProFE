import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Slide, useMediaQuery, useTheme, Box } from '@mui/material';
import './Jumpo.css'; // Import the CSS file
import bg from '../../../assets/bg.png';

const headings = [
  "Discover the Secret to Passing Exams",
  "Unlock Your Full Potential Today",
  "Achieve Success with Our Subjects",
  "Join a Community of Learners",
];

const Jumpo: React.FC = () => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const typingDuration = 175; // Duration for typing effect
    const deletingDuration = 600; // Duration for deleting effect
    const pauseDuration = 4000; // Duration to pause before deleting

    const currentHeading = headings[currentHeadingIndex];
    const lines = currentHeading.split("\n");

    let timeoutId: NodeJS.Timeout;
    let pauseTimeoutId: NodeJS.Timeout;

    const typingInterval = setInterval(() => {
      if (isTyping) {
        if (lineIndex < lines.length) {
          const currentLine = lines[lineIndex];
          if (displayedText.length < currentLine.length) {
            setDisplayedText((prev) => prev + currentLine.charAt(displayedText.length));
          } else {
            setLineIndex((prev) => prev + 1);
            setDisplayedText("");
            if (lineIndex + 1 >= lines.length) {
              setIsTyping(false);
            }
          }
        } else {
          setLineIndex(0);
          setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
          setIsTyping(false);
        }
      } else {
        if (displayedText.length > 0) {
          pauseTimeoutId = setTimeout(() => {
            timeoutId = setInterval(() => {
              setDisplayedText((prev) => prev.slice(0, -1));
            }, deletingDuration);
          }, pauseDuration);
        } else {
          setIsTyping(true);
        }
      }
    }, isTyping ? typingDuration : deletingDuration);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeoutId);
      clearTimeout(pauseTimeoutId);
    };
  }, [isTyping, displayedText, lineIndex, currentHeadingIndex]);

  return (
    <Box
      className="jumpo"
      sx={{
        padding: isSmallScreen ? 2 : 4,
       
        display: 'flex',
      }}
    >
      <Grid
        container
        spacing={isSmallScreen ? 2 : 4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6} sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}>
          <Slide direction="right" timeout={1000} in>
            <Box>
              <Typography
                variant={isSmallScreen ? 'h4' : 'h2'}
                className="typewriter-text"
                sx={{ fontWeight: 'bold' }}
              >
                {displayedText}
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: '1%' }} justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
                <Grid item>
                  <Button
                    sx={{
                      borderRadius: 50,
                      bgcolor: 'black',
                      color: 'white',
                      paddingX: isSmallScreen ? 2 : 4,
                      paddingY: 1,
                    }}
                    variant="contained"
                  >
                    Get Started
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderRadius: 50,
                      paddingX: isSmallScreen ? 2 : 4,
                      paddingY: 1,
                    }}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Slide>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Slide direction="left" timeout={1000} in>
            <img
              className="bg-image"
              src={bg}
              alt="bg"
              style={{
                maxWidth: '100%',
                height: isSmallScreen ? 'auto' : '50vh',
                // objectFit: 'contain',
              }}
            />
          </Slide>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Jumpo;
