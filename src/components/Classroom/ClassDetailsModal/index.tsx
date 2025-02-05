import React, { useState } from 'react';
import { Box, Modal, Typography, Checkbox, Button, FormControlLabel } from '@mui/material';

interface ClassDetailsModalProps {
    open: boolean;
    onClose: () => void;
    onNext: () => void;
    classDetails: {
        title: string;
        description: string;
        terms: string;
    };
}

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ open, onClose, onNext, classDetails }) => {
    const [agreed, setAgreed] = useState(false);

    const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, maxWidth: 400, mx: 'auto', mt: '20vh', boxShadow: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {classDetails.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    {classDetails.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Terms and Conditions
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {classDetails.terms}
                </Typography>
                <FormControlLabel
                    control={<Checkbox checked={agreed} onChange={handleAgreeChange} />}
                    label="I agree to the terms and conditions"
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={onNext} disabled={!agreed}>
                        Next
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ClassDetailsModal;
