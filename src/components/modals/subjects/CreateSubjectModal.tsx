import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../../constant';

const CreateSubjectModal = () => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [subjectDetails, setSubjectDetails] = useState({
        subject_name: '',
        subject_code: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [creationSuccess, setCreationSuccess] = useState<boolean | null>(null);  // Track success status
    const token = localStorage.getItem('token');

    const onCreateSubject = async () => {
        try {
            setIsLoading(true);
            setCreationSuccess(null);  // Reset creation status before sending the request

            // Construct the payload based on type
            const payload = {
                name: subjectDetails.subject_name,
                code: subjectDetails.subject_code,
                description: subjectDetails.description,
            };

            const response = await fetch(`${BASE_URL}/app/subjects/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setCreationSuccess(true); // Set success if response is OK
                setTimeout(() => {
                    setModalOpen(false);
                    window.location.reload();
                }, 1000);
            } else {
                setCreationSuccess(false); // Set failure if response is not OK
            }
        } catch (error) {
            console.log(error);
            setCreationSuccess(false);
        } finally {
            setIsLoading(false);  // Disable loading after the request completes
        }
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: '6px 16px',
                    marginTop: 2,
                    borderRadius: 2,
                }}
                onClick={() => setModalOpen(true)}
            >
                <span className='px-2 py-3  text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:flex md:text-xs'>
                    New Subject
                </span>
            </Button>

            <Dialog maxWidth="sm" fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>

                <DialogTitle>
                    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                        <h1 className='text-xl font-semibold'>Create Subject</h1>
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
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                            <span className='text-xs font-[500] leading-[24px] tracking-[0.4px]  md:text-sm'>
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
                            disabled={isLoading || creationSuccess === true} // Disable if loading or success
                        >
                            {isLoading ? (
                                <p className='text-xs text-gray-500'>Creating...</p>
                            ) : (
                                <span
                                    onClick={onCreateSubject}
                                    className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'
                                >
                                    {creationSuccess === null
                                        ? 'Create'
                                        : creationSuccess === true
                                        ? 'Created'
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

export default CreateSubjectModal;
