import React from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

interface QuestionProps {
    question: string;
    options: string[];
    questionId: number;
    selectedOption?: string;
    onOptionChange: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, questionId, selectedOption, onOptionChange }) => {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                {question}
            </Typography>
            <RadioGroup
                name={`question${questionId}`}
                value={selectedOption}
                onChange={(e) => onOptionChange(e.target.value)}
            >
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={`${String.fromCharCode(65 + index)}. ${option}`}
                    />
                ))}
            </RadioGroup>
        </Box>
    );
};

export default Question;
