import React, { useEffect, useState } from 'react';
import {
    Grid,

    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, Speed, Psychology, School, MenuBook } from '@mui/icons-material';
import logo from '../../assets/logo.png';
import LoginModal from '../../components/modals/LoginModal';


// Interface for the navbar props
interface NavBarProps {
    transparent?: boolean;
}

const pages = ['Home', 'Features', 'About', 'Contact'];

const NavBar: React.FC<NavBarProps> = ({ transparent = true }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [openLoginModal, setOpenLoginModal] = useState(false); // Add this state

    // ... rest of your existing code ...

    const handleOpenLoginModal = () => {
        setOpenLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false);
    };

    return (

        <>
            <AppBar
                position="fixed"
                elevation={isScrolled ? 4 : 0}
                sx={{
                    backgroundColor: isScrolled ? 'white' : transparent ? 'transparent' : 'white',
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
                    <Toolbar disableGutters>
                        {/* Logo - Desktop */}
                        <Box
                            component="img"
                            src={logo}
                            sx={{
                                height: 40,
                                display: { xs: 'none', md: 'flex' },
                                mr: 2
                            }}
                            alt="Logo"
                        />

                        {/* Mobile Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                sx={{ color: isScrolled ? '#1e293b' : 'white' }}
                            >
                                <MenuBook />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Logo - Mobile */}
                        <Box
                            component="img"
                            src={logo}
                            sx={{
                                height: 40,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                            }}
                            alt="Logo"
                        />

                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        mx: 2,
                                        color: isScrolled ? '#1e293b' : 'white',
                                        display: 'block',
                                        fontWeight: 500,
                                        '&:hover': {
                                            color: '#2563eb',
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {/* Login/Sign Up Buttons */}
                        <Box sx={{ flexGrow: 0 }}>
                            {/* <Button
                            variant="text"
                            sx={{
                                color: isScrolled ? '#1e293b' : 'white',
                                mr: 2,
                                '&:hover': {
                                    color: '#2563eb',
                                },
                            }}
                        >
                            Login
                        </Button> */}
                            <Button
                                variant="contained"
                                onClick={handleOpenLoginModal} // Add onClick handler
                                sx={{
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#1d4ed8',
                                    },
                                    px: 3,
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginModal
                open={openLoginModal}
                handleClose={handleCloseLoginModal}
            />
        </>
    );
};



const LandingPage: React.FC = () => {
    const features = [
        {
            icon: <Speed sx={{ fontSize: 40, color: '#2563eb' }} />,
            title: "Fast Grading",
            description: "Grade hundreds of papers in minutes with AI technology"
        },
        {
            icon: <CheckCircle sx={{ fontSize: 40, color: '#2563eb' }} />,
            title: "Accurate Results",
            description: "Consistent and objective assessments every time"
        },
        {
            icon: <Psychology sx={{ fontSize: 40, color: '#2563eb' }} />,
            title: "Smart Analytics",
            description: "Detailed insights into student performance"
        },
        {
            icon: <School sx={{ fontSize: 40, color: '#2563eb' }} />,
            title: "Educational Focus",
            description: "Designed for modern academic evaluation"
        }
    ];

    return (
        <>
            <NavBar />

            <Box sx={{
                width: '100vw',
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                overflowX: 'hidden' // Prevents horizontal scroll
            }}>

                {/* Hero Section */}
                <Box
                    sx={{

                        top: '50px',
                        width: '100%',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                        py: 12,
                        position: 'relative'
                    }}
                >
                    <Container maxWidth={false} sx={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1e293b',
                                            mb: 3,
                                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                                        }}
                                    >
                                        Transform Your Grading Process
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: '#64748b',
                                            mb: 4,
                                            lineHeight: 1.5
                                        }}
                                    >
                                        Intelligent grading powered by AI for faster, fairer assessments
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            backgroundColor: '#2563eb',
                                            px: 4,
                                            py: 2,
                                            borderRadius: 2,
                                            '&:hover': {
                                                backgroundColor: '#1d4ed8'
                                            }
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Box
                                        component="img"
                                        src={logo}
                                        alt="Platform Preview"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 4,
                                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                        }}
                                    />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Features Section */}
                <Box sx={{
                    width: '100%',
                    py: 12,
                    backgroundColor: 'white'
                }}>
                    <Container maxWidth={false} sx={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 700,
                                color: '#1e293b',
                                mb: 8
                            }}
                        >
                            Why Choose Our Platform?
                        </Typography>
                        <Grid container spacing={4}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Box
                                            sx={{
                                                p: 4,
                                                height: '100%',
                                                backgroundColor: 'white',
                                                borderRadius: 4,
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                transition: 'transform 0.2s',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)'
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                                {feature.icon}
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: 'center',
                                                    fontWeight: 600,
                                                    color: '#1e293b',
                                                    mb: 1
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textAlign: 'center',
                                                    color: '#64748b'
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* CTA Section */}
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#2563eb',
                        py: 12,
                        color: 'white'
                    }}
                >
                    <Container maxWidth={false} sx={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                                    Ready to Get Started?
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                    Join thousands of educators transforming their assessment workflow
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#2563eb',
                                        px: 4,
                                        py: 2,
                                        '&:hover': {
                                            backgroundColor: '#f8fafc'
                                        }
                                    }}
                                >
                                    Start Free Trial
                                </Button>
                            </Box>
                        </motion.div>
                    </Container>
                </Box>
            </Box>



        </>
    );
};

export default LandingPage;