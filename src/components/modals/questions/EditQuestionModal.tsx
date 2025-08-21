import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../../constant';
import { Edit } from '@mui/icons-material';

const EditQuestionModal = ({ questionID, btnText }: { questionID?: number; btnText?: string }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [questionDetails, setQuestionDetails] = useState({
        serial: '',
        comprehension: '',
        question: '',
        examiner_answer: '',
        question_score: 0,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editSuccess, setEditSuccess] = useState<boolean | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (modalOpen && questionID) {
            fetchQuestionDetails(questionID);
        }
    }, [modalOpen, questionID]);

    const fetchQuestionDetails = async (questionID: number) => {
        try {
            const response = await fetch(`${BASE_URL}/app/subject-questions/${questionID}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQuestionDetails({
                    serial: data.serial,
                    comprehension: data.comprehension,
                    question: data.question,
                    examiner_answer: data.examiner_answer,
                    question_score: data.question_score,
                });
            } else {
                console.error('Failed to fetch question details');
            }
        } catch (error) {
            console.log('Error fetching question details:', error);
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setQuestionDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
    };

    const onEditQuestion = async () => {
        try {
            setIsLoading(true);
            setEditSuccess(null);

            const payload = {
                serial: questionDetails.serial,
                comprehension: questionDetails.comprehension,
                question: questionDetails.question,
                examiner_answer: questionDetails.examiner_answer,
                question_score: questionDetails.question_score,
            };
            const response = await fetch(`${BASE_URL}/app/subject-questions/${questionID}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setEditSuccess(true);
                setTimeout(() => {
                    setModalOpen(false);
                    window.location.reload();
                }, 1000);
            } else {
                setEditSuccess(false);
            }
        } catch (error) {
            console.log(error);
            setEditSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                className='flex flex-row gap-4 text-blue-800'
                onClick={() => setModalOpen(true)}
            >
                <Edit width={20} />
                <p>{btnText}</p>
            </button>

            <Dialog maxWidth="md" fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>
                    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                        <h1 className='text-xl font-semibold'>Edit Question</h1>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setModalOpen(false)}
                            aria-label="cancel"
                        >
                            <CancelIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent className="mt-4">
                    <Box className="p-6 bg-gray-100 rounded-lg shadow-md">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box className="space-y-4">
                                    <TextField
                                        fullWidth
                                        label=" Question Number"
                                        variant="outlined"
                                        value={questionDetails.serial}
                                        onChange={(e) => handleInputChange('serial', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Comprehension"
                                        variant="outlined"
                                        value={questionDetails.comprehension}
                                        onChange={(e) => handleInputChange('comprehension', e.target.value)}
                                        multiline
                                        rows={10}
                                    />
                                    <TextField
                                        fullWidth
                                        label=" Question"
                                        variant="outlined"
                                        value={questionDetails.question}
                                        onChange={(e) => handleInputChange('question', e.target.value)}
                                        multiline
                                        rows={2}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Examiner Answer"
                                        variant="outlined"
                                        value={questionDetails.examiner_answer}
                                        onChange={(e) => handleInputChange('examiner_answer', e.target.value)}
                                        multiline
                                        rows={10}
                                    />
                                    <TextField
                                        fullWidth
                                        label=" Question Score"
                                        type="number"
                                        variant="outlined"
                                        value={questionDetails.question_score}
                                        onChange={(e) => handleInputChange('question_score', Math.max(0, Number(e.target.value)))}
                                        inputProps={{ min: 0 }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box className='my-4 flex w-full justify-end gap-4'>
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                padding: '6px 16px',
                                margin: 2,
                                borderRadius: 2,
                            }}
                            onClick={() => setModalOpen(false)}
                        >
                            <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] md:text-sm'>
                                Cancel
                            </span>
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                padding: '6px 16px',
                                margin: 2,
                                borderRadius: 2,
                            }}
                            disabled={isLoading || editSuccess === true}
                        >
                            {isLoading ? (
                                <p className='text-xs text-gray-500'>Editing...</p>
                            ) : (
                                <span
                                    onClick={onEditQuestion}
                                    className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'
                                >
                                    {editSuccess === null
                                        ? 'Edit'
                                        : editSuccess === true
                                            ? 'Edited'
                                            : 'Failed, Try Again'}
                                </span>
                            )}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditQuestionModal;