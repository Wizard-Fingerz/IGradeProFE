import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../../constant';
import { Edit } from '@mui/icons-material';

const EditSubjectModal = ({ subjectID, btnText }: { subjectID?: number; btnText?: string }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [subjectDetails, setSubjectDetails] = useState({
        subject_name: '',
        subject_code: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editSuccess, setEditSuccess] = useState<boolean | null>(null); // Track edit success
    const token = localStorage.getItem('token');

    // Fetch subject details for editing when modal opens
    useEffect(() => {
        if (modalOpen && subjectID) {
            fetchSubjectDetails(subjectID);
        }
    }, [modalOpen, subjectID]);

    const fetchSubjectDetails = async (subjectID: number) => {
        try {
            const response = await fetch(`${BASE_URL}/app/subjects/${subjectID}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSubjectDetails({
                    subject_name: data.name,
                    subject_code: data.code,
                    description: data.description,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onEditSubject = async () => {
        try {
            setIsLoading(true);
            setEditSuccess(null); // Reset edit status before sending the request

            const payload = {
                name: subjectDetails.subject_name,
                code: subjectDetails.subject_code,
                description: subjectDetails.description,
            };

            const response = await fetch(`${BASE_URL}/app/subjects/${subjectID}/`, {
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
                        <h1 className='text-xl font-semibold'>Edit Subject</h1>
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

                <DialogContent className=' mt-4'>
                    <Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            size='small'
                            label='Name'
                            placeholder=""
                            onChange={(e) =>
                                setSubjectDetails({
                                    ...subjectDetails,
                                    subject_name: e.target.value,
                                })
                            }
                            value={subjectDetails.subject_name}
                        />
                    </Box>

                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            size='small'
                            label='Code'
                            placeholder=""
                            onChange={(e) =>
                                setSubjectDetails({
                                    ...subjectDetails,
                                    subject_code: e.target.value,
                                })
                            }
                            value={subjectDetails.subject_code}
                        />
                    </Box>

                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            size='small'
                            label='Description'
                            placeholder=""
                            onChange={(e) =>
                                setSubjectDetails({
                                    ...subjectDetails,
                                    description: e.target.value,
                                })
                            }
                            value={subjectDetails.description}
                        />
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
                                    onClick={onEditSubject}
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

export default EditSubjectModal;
