import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Score, Quiz, Timer, History } from '@mui/icons-material';
import ExamInfoModal from '../ExamInfoModal';

interface ExamCardProps {
    examName?: string; // Optional prop for custom styling
}

const ExamListView: React.FC<ExamCardProps> = ({ examName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStudyPastQuestions = () => {
        // Navigate to the page where they can study past questions
        console.log('Navigating to past questions page...');
    };

    const handleStartPracticeExam = () => {
        // Navigate to the practice exam page
        console.log('Starting practice exam...');
    };

    return (
        <>
            <Box
                className={examName}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 2,
                    p: 2,
                    mb: 2,
                    width: '100%',
                    cursor: 'pointer', // Change cursor to pointer to indicate it's clickable
                }}
                onClick={handleOpenModal} // Add onClick event to open the modal
            >
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h3" fontWeight="bold">
                        Biology 2021
                    </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Typography
                        variant="caption"
                        sx={{ bgcolor: 'grey.200', px: 1.5, py: 0.5, borderRadius: 1, color: 'text.primary' }}
                    >
                        UTME
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title="Number of Attempts" arrow>
                        <History sx={{ color: '#26ABF5', mr: 1 }} />
                    </Tooltip>
                    <Typography variant="body2" color="#26ABF5">
                        4
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title="Highest Score" arrow>
                        <IconButton sx={{ color: '#9333EA' }}>
                            <Score />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="#9333EA">
                        30
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title="Questions" arrow>
                        <IconButton sx={{ color: '#B3261E' }}>
                            <Quiz />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="#B3261E">
                        100
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Duration" arrow>
                        <IconButton sx={{ color: '#386A20' }}>
                            <Timer />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="#386A20">
                        3 hours
                    </Typography>
                </Box>
            </Box>

            {/* Exam Info Modal */}
            <ExamInfoModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onStudyPastQuestions={handleStudyPastQuestions}
                onStartPracticeExam={handleStartPracticeExam}
                examName="Biology 2021"
            />
        </>
    );
};

export default ExamListView;
