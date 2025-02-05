import React from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormGroup } from '@mui/material';

interface PracticeQuestionCardProps {
  question: string;
  options: string[];
  correctAnswer: string; // add this prop to specify the correct answer
  questionId: number;
}

const PracticeQuestionCard: React.FC<PracticeQuestionCardProps> = ({ question, options, correctAnswer, questionId }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
        {question}
      </Typography>
      <RadioGroup
        name={`question${questionId}`}
      >
        <FormGroup sx={{ flexDirection: 'row' }}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio disabled={true} checked={option === correctAnswer} />} // disable all radios and check the correct answer
              label={`${String.fromCharCode(65 + index)}. ${option}`}
              sx={{ mr: 4 }} // add some margin right to separate the options
            />
          ))}
        </FormGroup>
      </RadioGroup>
    </Box>
  );
};

export default PracticeQuestionCard;