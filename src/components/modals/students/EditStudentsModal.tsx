import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../../constant';
import { Edit } from '@mui/icons-material';

const EditStudentModal = ({ studentID, btnText }: { studentID?: number; btnText?: string }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [studentDetails, setStudentDetails] = useState({
        firstName: '',
        otherName: '',
        lastName: '',
        centerNumber: '',
        candidateNum: '',
        examNum: '',
        examType: '',
        examYear: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editSuccess, setEditSuccess] = useState<boolean | null>(null); // Track edit success
    const token = localStorage.getItem('token');

    // Fetch Student details for editing when modal opens
    useEffect(() => {
        if (modalOpen && studentID) {
            fetchStudentDetails(studentID);
        }
    }, [modalOpen, studentID]);

    // Fetch Student details for editing
    const fetchStudentDetails = async (studentID: number) => {
        try {
            const response = await fetch(`${BASE_URL}/account/students/${studentID}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                // Assuming response fields should be mapped accordingly:
                setStudentDetails({
                    firstName: data.first_name,
                    otherName: data.other_name,
                    lastName: data.last_name,
                    centerNumber: data.center_number,
                    candidateNum: data.candidate_number,
                    examNum: data.examination_number,
                    examType: data.exam_type,
                    examYear: data.year,
                });
            } else {
                console.error('Failed to fetch student details');
            }
        } catch (error) {
            console.log('Error fetching student details:', error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setStudentDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
    };


    const onEditStudent = async () => {
        try {
            setIsLoading(true);
            setEditSuccess(null); // Reset edit status before sending the request

            const payload = {
                first_name: studentDetails.firstName,
                other_name: studentDetails.otherName,
                last_name: studentDetails.lastName,
                center_number: studentDetails.centerNumber,
                candidate_number: studentDetails.candidateNum,
                examination_number: studentDetails.examNum,
                exam_type: studentDetails.examType,
                year: studentDetails.examYear,
            };
            const response = await fetch(`${BASE_URL}/account/students/${studentID}/`, {
                method: 'PUT', // Change method to PUT for edit
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setEditSuccess(true); // Set success if response is OK
                setTimeout(() => {
                    setModalOpen(false);
                    window.location.reload();
                }, 1000);
            } else {
                setEditSuccess(false); // Set failure if response is not OK
            }
        } catch (error) {
            console.log(error);
            setEditSuccess(false);
        } finally {
            setIsLoading(false); // Disable loading after the request completes
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

            <Dialog maxWidth="sm" fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>

                <DialogTitle>
                    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                        <h1 className='text-xl font-semibold'>Edit Student</h1>
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
                            {/* Left Column */}
                            <Grid item xs={12} md={6}>
                                <Box className="space-y-4">
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                        value={studentDetails.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Other Name"
                                        variant="outlined"
                                        value={studentDetails.otherName}
                                        onChange={(e) => handleInputChange('otherName', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                        value={studentDetails.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Center Number"
                                        variant="outlined"
                                        value={studentDetails.centerNumber}
                                        onChange={(e) => handleInputChange('centerNumber', e.target.value)}
                                    />
                                </Box>
                            </Grid>

                            {/* Right Column */}
                            <Grid item xs={12} md={6}>
                                <Box className="space-y-4">
                                    <TextField
                                        fullWidth
                                        label="Candidate Number"
                                        variant="outlined"
                                        value={studentDetails.candidateNum}
                                        onChange={(e) => handleInputChange('candidateNum', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Examination Number"
                                        variant="outlined"
                                        value={studentDetails.examNum}
                                        onChange={(e) => handleInputChange('examNum', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Examination Type"
                                        variant="outlined"
                                        value={studentDetails.examType}
                                        onChange={(e) => handleInputChange('examType', e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Examination Year"
                                        variant="outlined"
                                        value={studentDetails.examYear}
                                        onChange={(e) => handleInputChange('examYear', e.target.value)}
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
                            disabled={isLoading || editSuccess === true} // Disable if loading or success
                        >
                            {isLoading ? (
                                <p className='text-xs text-gray-500'>Editing...</p>
                            ) : (
                                <span
                                    onClick={onEditStudent}
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

export default EditStudentModal;
