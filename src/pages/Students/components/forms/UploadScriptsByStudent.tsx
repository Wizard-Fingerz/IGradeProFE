import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, CircularProgress, Breadcrumbs, Box, Link, Typography, Avatar } from '@mui/material';
import { BASE_URL } from '../../../../constant';
import CustomInput from '../../../../components/CustomBorderedInput';
import { User } from '../../../../types/user';
import { getProfileDetails } from '../../../../services/auth/profile';
import { BackButton } from '../../../../components/BackButton';

const UploadScriptsByStudent: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const [user, setUser] = useState<User | null>(null);

    const [examFilters, setExamFilters] = useState({
        subjectCode: '',
        paperNumber: '',
        examType: '',
        year: '',
    });
    const [questions, setQuestions] = useState<any[]>([]);
    const [studentAnswers, setStudentAnswers] = useState<{ [key: string]: File }>({});
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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
        const fetchQuestions = async () => {
            const token = localStorage.getItem('token');
            const queryParams = new URLSearchParams({
                course__code: examFilters.subjectCode,
                paper_number: examFilters.paperNumber,
                exam_type: examFilters.examType,
                exam_year: examFilters.year,
            }).toString();

            try {
                const response = await fetch(`${BASE_URL}/exam/exams-with-questions/?${queryParams}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [examFilters]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setExamFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleAnswerChange = (questionId: string, file: File) => {
        setStudentAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: file,
        }));
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsUploading(true);
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('student_id', studentId!);

        Object.keys(studentAnswers).forEach((questionId) => {
            formData.append('question_ids', questionId);
            formData.append('files', studentAnswers[questionId]);
        });

        try {
            const response = await fetch(`${BASE_URL}/exam/ocr-per-student-script/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error uploading student answers');
            }

            alert('Student answers submitted successfully');
            setStudentAnswers({});
            Object.values(fileInputRefs.current).forEach(input => {
                if (input) input.value = '';
            });
        } catch (error) {
            alert('Error uploading student answers');
            console.error('Error uploading files:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box className="flex flex-col gap-4">

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
                        href="/students"
                    >
                        Students
                    </Link>
                    <Typography color="text.primary">Scripts</Typography>
                    <Typography color="text.primary">Oladiti John - 2445768DGFR</Typography>
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
            <BackButton />

            <Box className="flex flex-row justify-between gap-4">
                <Typography color="text.primary">

                    Upload Scripts</Typography>
                <Button type="submit" variant="contained" color="primary" disabled={isUploading} >
                    {isUploading ? <CircularProgress size={24} /> : 'Upload Answers'}
                </Button>
            </Box>


            <form onSubmit={handleUpload} className="space-y-4 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        label="Subject Code"
                        name="subjectCode"
                        value={examFilters.subjectCode}
                        onChange={handleFilterChange}
                        fullWidth
                    />
                    <TextField
                        label="Paper Number"
                        name="paperNumber"
                        value={examFilters.paperNumber}
                        onChange={handleFilterChange}
                        fullWidth
                    />
                    <TextField
                        label="Exam Type"
                        name="examType"
                        value={examFilters.examType}
                        onChange={handleFilterChange}
                        fullWidth
                    />
                    <TextField
                        label="Year"
                        name="year"
                        type="number"
                        value={examFilters.year}
                        onChange={handleFilterChange}
                        fullWidth
                    />
                </div>
                <div className="space-y-4">
                    {questions.map((exam, examIndex) => (
                        <div key={examIndex} className="border p-4 rounded-md">
                            {exam.questions.map((question: { course_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; question_number: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; question: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; question_score: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: string; sub_questions: any[]; }, index: React.Key | null | undefined) => (
                                <div key={index} className="mb-4">
                                    <div className="font-semibold">
                                        {question.course_name} (Question Number: {question.question_number}) {question.question}
                                    </div>
                                    <div className="text-sm mb-2">(Score: {question.question_score} marks)</div>
                                    <input
                                        type="file"
                                        onChange={(e) => handleAnswerChange(question.id, e.target.files![0])}
                                        ref={el => fileInputRefs.current[`question-${index}`] = el}
                                        className="block w-full"
                                    />
                                    {question.sub_questions && question.sub_questions.length > 0 && (
                                        <div className="ml-4 mt-2">
                                            {question.sub_questions.map((subQuestion, subIndex) => (
                                                <div key={subIndex} className="mb-2">
                                                    <div className="font-semibold">
                                                        {subQuestion.course_name} (Question Number: {subQuestion.question_number}) {subQuestion.question}
                                                    </div>
                                                    <div className="text-sm mb-2">(Score: {subQuestion.question_score} marks)</div>
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleAnswerChange(subQuestion.id, e.target.files![0])}
                                                        ref={el => fileInputRefs.current[`sub-question-${subIndex}`] = el}
                                                        className="block w-full"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </form>
        </Box>
    );
};

export default UploadScriptsByStudent;