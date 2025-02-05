import { KeyboardArrowDown, Book } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Typography, AccordionDetails, Avatar, Button, TextField } from "@mui/material";

interface Props {
    title: string;
    subtitle: string;
    date: string;
    message: string;
    buttonText: string;
    buttonIcon: React.ReactElement;
    expanded: boolean;
    onChange: (isExpanded: boolean) => void;
  }
  
  const ClassroomAccordion: React.FC<Props> = ({
    title,
    subtitle,
    date,
    message,
    buttonText,
    buttonIcon,
    expanded,
    onChange,
  }) => {
    return (
      <Accordion elevation={3} sx={{ marginBottom: 4 }} expanded={expanded} onChange={(_event, isExpanded) => onChange(isExpanded)}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Box display="flex">
              <Book sx={{ mr: 1 }} />
              <Typography fontWeight="bold">{title}</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'gray', width: 40, height: 40, mr: 2 }} />
            <Box>
              <Typography fontWeight="bold">{subtitle}</Typography>
              <Typography variant="body2" color="textSecondary">
                {date}
              </Typography>
            </Box>
          </Box>
          <Typography mb={2}>{message}</Typography>
          <Button variant="contained" color="success" startIcon={buttonIcon}>
            {buttonText}
          </Button>
        </AccordionDetails>
  
        <Box mt={4}>
          <TextField
            fullWidth
            placeholder="Add a comment to the class..."
            variant="outlined"
          />
        </Box>
      </Accordion>
    );
  };
  
  export default ClassroomAccordion;