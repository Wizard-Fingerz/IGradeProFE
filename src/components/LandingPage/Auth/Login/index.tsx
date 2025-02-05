import * as React from 'react';
import { Box, Button, Modal, TextField, Typography, Grid, ImageList, ImageListItem } from '@mui/material';
import { ChevronLeft, ChevronRight, Close, Facebook, Google, Twitter } from '@mui/icons-material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import libraryImage from '../../../../assets/authImg/library.jpg';
import classRoomImage from '../../../../assets/authImg/classroom.jpg';
import examImage from '../../../../assets/authImg/exam.jpg';
import { useNavigate } from 'react-router-dom';
import AuthApiService from '../../../../services/auth';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const navigate = useNavigate();

    const images = [classRoomImage, libraryImage, examImage];
    const authApiService = new AuthApiService(); // Create an instance of the AuthApiService class

    const handleLogin = async () => {
        if (username && password) {
            try {

                await authApiService.login(username, password);
                // You can do something with the authResponse if needed
                navigate('/',  { replace: true });
                window.location.reload();
            } catch (error) {
                setError('Login failed. Please check your credentials.');
            }
        } else {
            setError('Please enter both username and password');
        }
    };

    const handleNext = React.useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = React.useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);



    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '70vw' },
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                    }}
                >
                    <Button
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: 1,
                        }}
                    >
                        <Close />
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography id="login-modal-title" variant="h6" component="h2">
                                Sign In
                            </Typography>
                            <Typography id="login-modal-description" sx={{ mt: 2 }}>
                                Please enter your username and password to login.
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                {error && (
                                    <Typography sx={{ color: 'error.main', mt: 2 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogin}
                                    sx={{ mt: 2, width: '100%' }}
                                >
                                    Login
                                </Button>
                            </Box>
                            <Typography sx={{ mt: 3, mb: 1, textAlign: 'center' }}>
                                Or continue with
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                                flexWrap: 'wrap',
                                '@media (max-width: 600px)': { // adjust the width as needed
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                },
                            }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Google />}
                                    sx={{
                                        color: '#DB4437',
                                        width: '100%',
                                        borderColor: '#DB4437',
                                        '&:hover': {
                                            backgroundColor: 'rgba(219, 68, 55, 0.1)',
                                            borderColor: '#DB4437',
                                        },
                                    }}
                                >
                                    Google
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Facebook />}
                                    sx={{
                                        color: '#4267B2',
                                        width: '100%',
                                        borderColor: '#4267B2',
                                        '&:hover': {
                                            backgroundColor: 'rgba(66, 103, 178, 0.1)',
                                            borderColor: '#4267B2',
                                        },
                                    }}
                                >
                                    Facebook
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Twitter />}
                                    sx={{
                                        color: '#1DA1F2',
                                        width: '100%',
                                        borderColor: '#1DA1F2',
                                        '&:hover': {
                                            backgroundColor: 'rgba(29, 161, 242, 0.1)',
                                            borderColor: '#1DA1F2',
                                        },
                                    }}
                                >
                                    Twitter
                                </Button>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={6} container alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <ImageList sx={{ width: '100%', height: '100%' }} cols={1}>
                                    <ImageListItem>
                                        <LazyLoadImage
                                            src={images[currentIndex]}
                                            alt={`dashboard-slide-${currentIndex}`}
                                            effect="blur"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </ImageListItem>
                                </ImageList>
                                {/* Previous and Next buttons */}
                                <Button
                                    onClick={handlePrev}
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                    }}
                                >
                                    <ChevronLeft />
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                    }}
                                >
                                    <ChevronRight />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>


        </>
    );
};

export default React.memo(LoginModal);
