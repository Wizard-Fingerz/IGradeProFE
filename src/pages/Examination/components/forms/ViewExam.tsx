import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Link, CircularProgress, Paper, Avatar, Breadcrumbs, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../../components/BackButton';
import { fetchExaminationById } from '../../../../services/exams';
import CustomInput from '../../../../components/CustomBorderedInput';
import { User } from '../../../../types/user';
import { getProfileDetails } from '../../../../services/auth/profile';

interface SubQuestion {
    serial: string;
    comprehension: string;
    question: string;
    examiner_answer: string;
    question_score: string;
    is_optional: boolean;
}

interface Question {
    serial: number;
    comprehension: string;
    question: string;
    examiner_answer: string;
    question_score: string;
    is_optional: boolean;
    sub_questions: SubQuestion[];
}

interface ExamData {
    exam_year: string;
    exam_type: string;
    total_mark: string;
    paper_number: string;
    subject: string;
    questions: Question[];
}

const ViewExam: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [examData, setExamData] = useState<ExamData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const fetchStudentMe = async () => {
            const response = await getProfileDetails();
            if (response) {
                setUser(response);
            }
        };
        fetchStudentMe();
    }, []);
    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await fetchExaminationById(id);
                if (response) {
                    setExamData(response);
                }
            } catch (error) {
                console.error('Failed to fetch exam details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExam();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };



    return (
        <Container className='flex flex-col gap-4'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Breadcrumbs aria-label="breadcrumb"
                    sx={{
                        '& .MuiBreadcrumbs-li': {
                            fontSize: 28,
                            fontWeight: 600,
                        }
                    }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/exams"
                    >
                        Examinations
                    </Link>
                    <Typography color="text.primary">View Exam</Typography>
                </Breadcrumbs>


                <Box sx={
                    {
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
                        justifyContent: 'space-between',

                    }
                }>
                    <CustomInput />

                    <div className="top-navbar-icons">
                        <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
                    </div>

                </Box>


            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                <BackButton />
                <Button onClick={handlePrint} variant="contained" color="primary">
                    Print
                </Button>
            </Box>
            <Paper elevation={1} sx={{ p: 4 }}>
                {isLoading ? (
                    <CircularProgress />
                ) : !examData ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            No Exam Details Available
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            The exam details could not be loaded. Please try again later or contact support if the problem persists.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon />}
                            onClick={() => window.location.reload()}
                            sx={{ mt: 2 }}
                        >
                            Reload Page
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Exam Details
                        </Typography>
                        <Typography variant="h6">Subject: {examData.subject}</Typography>
                        <Typography variant="h6">Exam Year: {examData.exam_year}</Typography>
                        <Typography variant="h6">Exam Type: {examData.exam_type}</Typography>
                        <Typography variant="h6">Paper Number: {examData.paper_number}</Typography>
                        <Typography variant="h6">Total Mark: {examData.total_mark}</Typography>

                        <Divider sx={{ my: 2 }} />

                        {examData.questions.map((question, index) => (
                            <Box key={index} mt={4}>
                                <Typography variant="h6">Question {question.serial}</Typography>
                                <Typography>Comprehension: {question.comprehension}</Typography>
                                <Typography>Question: {question.question}</Typography>
                                <Typography>Examiner Answer: {question.examiner_answer}</Typography>
                                <Typography>Question Score: {question.question_score}</Typography>
                                <Typography>Is Optional: {question.is_optional ? 'Yes' : 'No'}</Typography>

                                {question.sub_questions.map((subQuestion, subIndex) => (
                                    <Box key={subIndex} mt={2} ml={4}>
                                        <Typography variant="subtitle1">Sub-Question {subQuestion.serial}</Typography>
                                        <Typography>Comprehension: {subQuestion.comprehension}</Typography>
                                        <Typography>Question: {subQuestion.question}</Typography>
                                        <Typography>Examiner Answer: {subQuestion.examiner_answer}</Typography>
                                        <Typography>Question Score: {subQuestion.question_score}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </>

                )}
            </Paper>
        </Container>
    );
};

export default ViewExam;