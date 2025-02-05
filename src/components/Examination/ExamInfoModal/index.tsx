import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

interface ExamInfoModalProps {
    open: boolean;
    onClose: () => void;
    onStudyPastQuestions: () => void;
    onStartPracticeExam: () => void;
    examName?: string; // Optional prop for exam-specific styling or title
}

const ExamInfoModal: React.FC<ExamInfoModalProps> = ({
    open,
    onClose,
    onStudyPastQuestions,
    onStartPracticeExam,
    examName
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                }}
            >
                <Typography variant="h6" component="h2" mb={2} fontWeight="bold">
                    {examName ? examName : 'Examination Instructions'}
                </Typography>
                <Typography variant="body1" mb={4}>
                    Please review the following terms and conditions, as well as any instructions or introductory details about the examination.
                    Ensure that you fully understand the requirements before proceeding.
                </Typography>
                {/* Replace this text with actual terms and conditions, instructions, or details */}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" color="primary" onClick={onStudyPastQuestions}>
                        Study Exam
                    </Button>
                    <Button variant="contained" color="primary" onClick={onStartPracticeExam}>
                        Practise Exam
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ExamInfoModal;
