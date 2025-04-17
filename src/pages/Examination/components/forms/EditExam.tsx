import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, CircularProgress, Container, Typography, Box, Avatar, Breadcrumbs, Link, Autocomplete } from '@mui/material';
import { BASE_URL } from '../../../../constant';
import CustomInput from '../../../../components/CustomBorderedInput';
import { getProfileDetails } from '../../../../services/auth/profile';
import React from 'react';
import { User } from '../../../../types/user';
import { BackButton } from '../../../../components/BackButton';
import { fetchAllSubjects } from '../../../../services/subjects';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



interface SubSubQuestion {
    serial: string;
    comprehension: string;
    question: string;
    examiner_answer: string;
    question_score: string;
}

interface SubQuestion {
    serial: string;
    comprehension: string;
    question: string;
    examiner_answer: string;
    question_score: string;
    is_optional: boolean;
    sub_sub_questions: SubSubQuestion[]; // Add this property
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

const EditExam: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [examData, setExamData] = useState<ExamData>({
        exam_year: '',
        exam_type: '',
        total_mark: '',
        paper_number: '',
        subject: '',
        questions: [
            {
                serial: 1,
                comprehension: '',
                question: '',
                examiner_answer: '',
                question_score: '',
                is_optional: false,
                sub_questions: []
            },
        ],
    });
    const [user, setUser] = useState<User | null>(null);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        const fetchExamData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${BASE_URL}/app/exam-details/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setExamData(data);
                } else {
                    console.error('Failed to fetch exam data');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };
        fetchExamData();
    }, [id]);

    const updateExam = async () => {
        const token = localStorage.getItem('token');
        setIsSubmitting(true);

        try {
            const formattedExamData = {
                exam_year: examData.exam_year,
                exam_type: examData.exam_type,
                total_mark: examData.total_mark,
                paper_number: examData.paper_number,
                subject: examData.subject,
                questions: examData.questions.map((question) => ({
                    comprehension: question.comprehension,
                    question: question.question,
                    question_number: question.serial,
                    examiner_answer: question.examiner_answer,
                    question_score: question.question_score,
                    is_optional: question.is_optional,
                    sub_questions: question.sub_questions.map((subQuestion) => ({
                        comprehension: subQuestion.comprehension,
                        question: subQuestion.question,
                        question_number: subQuestion.serial,
                        examiner_answer: subQuestion.examiner_answer,
                        question_score: subQuestion.question_score,
                        sub_sub_questions: subQuestion.sub_sub_questions.map((subSubQuestion) => ({
                            comprehension: subSubQuestion.comprehension,
                            question: subSubQuestion.question,
                            question_number: subSubQuestion.serial,
                            examiner_answer: subSubQuestion.examiner_answer,
                            question_score: subSubQuestion.question_score,
                        }
                        )),
                    })),
                })),
            };

            const response = await fetch(`${BASE_URL}/app/exam-update/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formattedExamData),
            });

            if (response.ok) {
                toast.success('Examination Updated Successfully');

            } else {
                console.error('Exam update failed');
                const data = await response.json();
                toast.error(data.detail || 'Exam updation failed. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetchAllSubjects();
                if (response && Array.isArray(response.results)) {
                    setSubjects(response.results);
                } else {
                    console.error('Expected an array of subjects in results');
                }
            } catch (error) {
                console.error('Failed to fetch subjects:', error);
            }
        };

        fetchSubjects();
    }, []);

    const handleSubSubQuestionChange = (parentIndex: number, subIndex: number, index: number, field: keyof SubSubQuestion, value: any) => {
        const updatedQuestions = [...examData.questions];
        (updatedQuestions[parentIndex].sub_questions[subIndex].sub_sub_questions[index] as any)[field] = value;
        setExamData({ ...examData, questions: updatedQuestions });
    };


    const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
        const updatedQuestions = [...examData.questions];
        (updatedQuestions[index] as any)[field] = value;
        if (field === 'is_optional') {
            updatedQuestions[index].sub_questions = updatedQuestions[index].sub_questions.map(subQuestion => ({
                ...subQuestion,
                is_optional: value
            }));
        }
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const handleSubQuestionChange = (parentIndex: number, index: number, field: keyof SubQuestion, value: any) => {
        const updatedQuestions = [...examData.questions];
        (updatedQuestions[parentIndex].sub_questions[index] as any)[field] = value;
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const addSubQuestion = (parentIndex: number) => {
        const updatedQuestions = [...examData.questions];
        const newSubQuestion: SubQuestion = {
            serial: `${updatedQuestions[parentIndex].serial}${String.fromCharCode(98 + updatedQuestions[parentIndex].sub_questions.length)}`,
            comprehension: '',
            question: '',
            examiner_answer: '',
            question_score: '',
            is_optional: updatedQuestions[parentIndex].is_optional,
            sub_sub_questions: []
        };
        updatedQuestions[parentIndex].sub_questions.push(newSubQuestion);
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const removeSubQuestion = (parentIndex: number, index: number) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[parentIndex].sub_questions.splice(index, 1);
        setExamData({ ...examData, questions: updatedQuestions });
    };


    const addSubSubQuestion = (parentIndex: number, subIndex: number) => {
        const updatedQuestions = [...examData.questions];
        const subSubQuestions = updatedQuestions[parentIndex].sub_questions[subIndex].sub_sub_questions;
        const newSerial = `${updatedQuestions[parentIndex].sub_questions[subIndex].serial}${subSubQuestions.length + 2}`; // Start with i, ii, iii...
        const newSubSubQuestion: SubSubQuestion = {
            serial: newSerial,
            comprehension: '',
            question: '',
            examiner_answer: '',
            question_score: '',
        };
        subSubQuestions.push(newSubSubQuestion);
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const removeSubSubQuestion = (parentIndex: number, subIndex: number, index: number) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions[parentIndex].sub_questions[subIndex].sub_sub_questions.splice(index, 1);
        setExamData({ ...examData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        const newSerial = examData.questions.length + 1;
        setExamData({
            ...examData,
            questions: [
                ...examData.questions,
                { serial: newSerial, comprehension: '', question: '', examiner_answer: '', question_score: '', is_optional: false, sub_questions: [] },
            ],
        });
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = [...examData.questions];
        updatedQuestions.splice(index, 1);
        setExamData({ ...examData, questions: updatedQuestions });
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
                        href="/questions"
                    >
                        Questions
                    </Link>
                    <Typography color="text.primary">Edit Question</Typography>
                </Breadcrumbs>

                <Box sx={
                    {
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                    }
                }>
                    <CustomInput />

                    <div className="top-navbar-icons">
                        <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
                    </div>
                </Box>
            </Box>

            <div className='flex flex-row justify-between items-center mb-4 sticky top-0 bg-inherit'>
                <BackButton />
                <div className='flex flex-row gap-4'>
                    <Button onClick={addQuestion} variant="contained" color="primary">
                        Add Question
                    </Button>
                    <Button onClick={updateExam} variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={24} /> : 'Update'}
                    </Button>
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

                </div>
            </div>
            <form className='max-h-[75vh] overflow-y-auto p-4'>
                <Typography variant="h6" gutterBottom>Exam Details</Typography>

                <Box mb={2} className='flex flex-row gap-4 w-full'>
                    <Box mb={2}>
                        <Autocomplete
                            options={subjects}
                            getOptionLabel={(option) => `${option.name} (${option.code})`}
                            value={subjects.find((subject) => subject.id === examData.subject) || null}
                            onChange={(event, newValue) => {
                                setExamData({ ...examData, subject: newValue ? newValue.id : '' });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Subject"
                                    required
                                    fullWidth
                                    style={{ minWidth: 200 }} // Set a minimum width
                                />
                            )}
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Exam Year"
                            type="number"
                            value={examData.exam_year}
                            onChange={(e) => setExamData({ ...examData, exam_year: Math.max(0, Number(e.target.value)).toString() })}
                            inputProps={{ min: 0 }}
                            fullWidth
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Exam Type"
                            value={examData.exam_type}
                            onChange={(e) => setExamData({ ...examData, exam_type: e.target.value })}
                            fullWidth
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Paper Number"
                            value={examData.paper_number}
                            onChange={(e) => setExamData({ ...examData, paper_number: e.target.value })}
                            fullWidth
                            required
                        />
                    </Box>

                    <Box mb={2}>
                        <TextField
                            label="Total Mark"
                            type="number"
                            value={examData.total_mark}
                            onChange={(e) => setExamData({ ...examData, total_mark: Math.max(0, Number(e.target.value)).toString() })}
                            inputProps={{ min: 0 }}
                            fullWidth
                        />
                    </Box>
                </Box>

                {examData.questions.map((question, parentIndex) => (
                    <Box key={parentIndex} mb={2} p={2} border={1} borderRadius={4} className='flex flex-col gap-4'>
                        <TextField
                            label="Question Number"
                            value={question.serial}
                            onChange={(e) => handleQuestionChange(parentIndex, 'serial', e.target.value)}
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={question.is_optional}
                                    onChange={(e) => handleQuestionChange(parentIndex, 'is_optional', e.target.checked)}
                                />
                            }
                            label="Is Optional"
                        />
                        <TextField
                            label="Comprehension"
                            value={question.comprehension}
                            onChange={(e) => handleQuestionChange(parentIndex, 'comprehension', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Question"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(parentIndex, 'question', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Examiner Answer"
                            value={question.examiner_answer}
                            onChange={(e) => handleQuestionChange(parentIndex, 'examiner_answer', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Question Score"
                            type="number"
                            value={question.question_score}
                            onChange={(e) => handleQuestionChange(parentIndex, 'question_score', Math.max(0, Number(e.target.value)))}
                            inputProps={{ min: 0 }}
                            fullWidth
                        />
                        <Button onClick={() => addSubQuestion(parentIndex)} variant="contained" color="primary">
                            Add Sub-Question
                        </Button>
                        <Button onClick={() => removeQuestion(parentIndex)} variant="contained" color="secondary">
                            Remove Question
                        </Button>
                        {question.sub_questions.map((subQuestion, subIndex) => (
                            <Box key={subIndex} mt={2} p={2} border={1} borderRadius={4} className='flex flex-col gap-4'>
                                <TextField
                                    label="Sub-Question Number"
                                    value={subQuestion.serial}
                                    onChange={(e) => handleSubQuestionChange(parentIndex, subIndex, 'serial', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Comprehension"
                                    value={subQuestion.comprehension}
                                    onChange={(e) => handleSubQuestionChange(parentIndex, subIndex, 'comprehension', e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                                <TextField
                                    label="Sub-Question"
                                    value={subQuestion.question}
                                    onChange={(e) => handleSubQuestionChange(parentIndex, subIndex, 'question', e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                                <TextField
                                    label="Examiner Answer"
                                    value={question.examiner_answer}
                                    onChange={(e) => handleSubQuestionChange(parentIndex, subIndex, 'examiner_answer', e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                                <TextField
                                    label="Question Score"
                                    type="number"
                                    value={question.question_score}
                                    onChange={(e) => handleSubQuestionChange(parentIndex, subIndex, 'question_score', Math.max(0, Number(e.target.value)))}
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                />
                                <Button onClick={() => addSubSubQuestion(parentIndex, subIndex)} variant="contained" color="primary">
                                    Add Sub-Sub-Question
                                </Button>
                                <Button onClick={() => removeSubQuestion(parentIndex, subIndex)} variant="contained" color="secondary">
                                    Remove Sub-Question
                                </Button>

                                {subQuestion.sub_sub_questions.map((subSubQuestion, index) => (
                                    <Box key={index} mt={2} p={2} border={1} borderRadius={4} className='flex flex-col gap-4'>
                                        <TextField
                                            label="Sub-Sub-Question Number"
                                            value={subSubQuestion.serial}
                                            onChange={(e) => handleSubSubQuestionChange(parentIndex, subIndex, index, 'serial', e.target.value)}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Comprehension"
                                            value={subSubQuestion.comprehension}
                                            onChange={(e) => handleSubSubQuestionChange(parentIndex, subIndex, index, 'comprehension', e.target.value)}
                                            fullWidth
                                            multiline
                                            rows={2}
                                        />
                                        <TextField
                                            label="Sub-Sub-Question"
                                            value={subSubQuestion.question}
                                            onChange={(e) => handleSubSubQuestionChange(parentIndex, subIndex, index, 'question', e.target.value)}
                                            fullWidth
                                            multiline
                                            rows={2}
                                        />
                                        <TextField
                                            label="Examiner Answer"
                                            value={question.examiner_answer}
                                            onChange={(e) => handleSubSubQuestionChange(parentIndex, subIndex, index, 'examiner_answer', e.target.value)}
                                            fullWidth
                                            multiline
                                            rows={2}
                                        />
                                        <TextField
                                            label="Question Score"
                                            type="number"
                                            value={question.question_score}
                                            onChange={(e) => handleSubSubQuestionChange(parentIndex, subIndex, index, 'question_score', Math.max(0, Number(e.target.value)))}
                                            inputProps={{ min: 0 }}
                                            fullWidth
                                        />
                                        <Button onClick={() => removeSubSubQuestion(parentIndex, subIndex, index)} variant="contained" color="secondary">
                                            Remove Sub-Sub-Question
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ))}


            </form>
        </Container>
    );
};

export default EditExam;