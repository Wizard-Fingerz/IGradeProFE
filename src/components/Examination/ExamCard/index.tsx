import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { Score, Quiz, Timer, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ExamInfoModal from '../ExamInfoModal';

interface ExamCardProps {
    examName?: string; // Optional prop for custom styling
}

const ExamCard: React.FC<ExamCardProps> = ({ examName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStudyPastQuestions = () => {
        // Navigate to the page where they can study past questions
        navigate('/examination/study-exam'); // Update with the correct route
    };

    const handleStartPracticeExam = () => {
        // Navigate to the practice exam page
        navigate('/examination/practise-exam'); // Update with the correct route
    };

    return (
        <>
            <Box
                className={examName}
                sx={{
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="h3" fontWeight="bold">
                        Biology 2021
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <History sx={{ color: '#26ABF5', mr: 0.5 }} />
                        <Typography variant="body2" color="#26ABF5">
                            4
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    {['UTME'].map((tag, index) => (
                        <Typography
                            key={index}
                            variant="caption"
                            sx={{
                                mr: 1,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: index === 0 ? 'grey.200' : 'yellow.200',
                                color: index === 0 ? 'text.primary' : 'yellow.800',
                            }}
                        >
                            {tag}
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Tooltip title="Highest Score" arrow>
                            <IconButton sx={{ color: '#9333EA' }}>
                                <Score />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" color="#9333EA">
                            30
                        </Typography>

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

export default ExamCard;
