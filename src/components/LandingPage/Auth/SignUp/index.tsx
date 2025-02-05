import * as React from 'react';
import { Box, Button, Modal, TextField, Typography, Grid, ImageList, ImageListItem } from '@mui/material';
import { ChevronLeft, ChevronRight, Close, Facebook, Google, Twitter } from '@mui/icons-material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import libraryImage from '../../../../assets/authImg/library.jpg';
import classRoomImage from '../../../../assets/authImg/classroom.jpg';
import examImage from '../../../../assets/authImg/exam.jpg';
import AuthApiService from '../../../../services/auth';
import { useNavigate } from 'react-router-dom';


interface SignUpModalProps {
    open: boolean;
    onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const images = [classRoomImage, libraryImage, examImage];
    const authApiService = new AuthApiService(); // Create an instance of the AuthApiService class


    const handleSignUp = async () => {
        try {
          await authApiService.register(email, password, username);
          // Handle successful registration
          onClose();
          navigate('/profile',  { replace: true }); 
          // You can also redirect the user to a login page or dashboard
        } catch (error: any) {
          setError(error.message);
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
                aria-labelledby="sign-up-modal-title"
                aria-describedby="sign-up-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '70vw' },
                        // height: { xs: '90%', sm: '90vh' },
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
                            <Typography id="sign-up-modal-title" variant="h6" component="h2">
                                Sign Up
                            </Typography>
                            <Typography id="sign-up-modal-description" sx={{ mt: 2 }}>
                                Please enter your details to create an account.
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
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onClick={handleSignUp}
                                    sx={{ mt: 2, width: '100%' }}
                                >
                                    Sign Up
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

export default SignUpModal;
