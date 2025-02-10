import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AuthApiService from '../../../services/auth';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const authApiService = new AuthApiService(); // Create an instance of the AuthApiService class

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (username && password) {
            try {
                const authResponse = await authApiService.login(username, password); 
                // Assuming `authResponse` contains the token
    
                if (authResponse && authResponse.access) {
                    localStorage.setItem('token', authResponse.access); // Save the token
                    navigate('/', { replace: true }); // Redirect to the dashboard
                    handleClose(); // Close the modal
                    window.location.reload()
                } else {
                    setError('Login failed. Please check your credentials.');
                }
            } catch (error) {
                setError('Login failed. Please check your credentials.');
            }
        } else {
            setError('Please enter both username and password');
        }
    };
    
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal"
            aria-describedby="login-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 },
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                    Sign In
                </Typography>

                <Box
                    component="form"
                    sx={{ mt: 1 }}
                    onSubmit={handleLogin} // Attach onSubmit handler here
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p>{error}</p>
                    <Button
                        type="submit" // Ensure this button triggers form submission
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#2563eb',
                            '&:hover': {
                                backgroundColor: '#1d4ed8',
                            },
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default LoginModal;
