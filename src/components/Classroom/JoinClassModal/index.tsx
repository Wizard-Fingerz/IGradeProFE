import React from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { QrCodeScanner } from '@mui/icons-material';

interface JoinClassModalProps {
    open: boolean;
    onClose: () => void;
    onJoin: (classCode: string) => void;
}

const JoinClassModal: React.FC<JoinClassModalProps> = ({ open, onClose, onJoin }) => {
    const [classCode, setClassCode] = React.useState('');

    const handleJoin = () => {
        onJoin(classCode);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, maxWidth: 400, mx: 'auto', mt: '20vh', boxShadow: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    Join Class
                </Typography>
                <TextField
                    label="Class Code"
                    variant="outlined"
                    fullWidth
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button startIcon={<QrCodeScanner />} variant="outlined" sx={{ mr: 2 }}>
                        Scan QR
                    </Button>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleJoin} disabled={!classCode}>
                        Join Class
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default JoinClassModal;
