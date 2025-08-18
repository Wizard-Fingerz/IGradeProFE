import React, { useEffect, useState } from 'react';
import {
    Box, IconButton, Typography, Divider, Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    useMediaQuery,
    useTheme,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Book as BookIcon,
    People as PeopleIcon,
    QuestionAnswer as QuestionAnswerIcon,
    Assignment as AssignmentIcon,
    Grade as GradeIcon,
    Assessment as AssessmentIcon,
    ExitToApp as ExitToAppIcon,
    Menu,
    MenuOpen,
    UnfoldMore,
    Help as HelpIcon
} from '@mui/icons-material';
import SidebarItem from '../SideBarItem/SideBarItem';
import logo from '../../assets/logo.png';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import AuthApiService from '../../services/auth';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Use breakpoints for responsiveness
    const [user, setUser] = useState<User | null>(null);
    const authApiService = new AuthApiService(); // Create an instance of the AuthApiService class

    useEffect(() => {
        const fetchStudentMe = async () => {
            const response = await getProfileDetails();
            console.log(response);

            if (response) {
                setUser(response);
            }
        };
        fetchStudentMe();
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSignOutClick = () => {
        setIsDialogOpen(true); // Open the dialog
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false); // Close the dialog
    };

    const handleConfirmSignOut = async () => {
        try {
            await authApiService.logout(); // Call the logout service
            console.log('User signed out');
            // Redirect to login or clear user session
            window.location.href = '/index'; // Example: Redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsDialogOpen(false);
        }
    };



    return (
        <Box
            className={`sidebar ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
            sx={{
                width: isOpen ? (isMobile ? '60vw' : 256) : (isMobile ? 56 : 80),
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                margin: 0,
                bgcolor: 'background.paper',
                boxShadow: 1,
                transition: 'width 0.3s, opacity 0.3s',
                opacity: isMobile && !isOpen ? 1 : 1,
                visibility: isMobile && !isOpen ? 'visible' : 'visible',
                overflow: isMobile && !isOpen ? 'hidden' : 'auto',
                display: isMobile ? 'none' : 'flex', // Hide on mobile screens
                flexDirection: 'column',
                zIndex: 1300,
            }}
        >
            <Box className="sidebar-header" display="flex" alignItems="center" sx={{ padding: 1 }}>
                {isOpen &&
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                        <img src={logo} alt="Logo" style={{ width: '100%', height: '50%', objectFit: 'contain' }} />
                    </Box>
                }
                <IconButton onClick={toggleSidebar}>
                    {isOpen ? <MenuOpen /> : <Menu />}
                </IconButton>
            </Box>

            <Box
                sx={{
                    height: 'calc(90% - 80px)', // Adjust the height to exclude the footer area
                    overflowY: 'auto',
                    padding: 2,
                }}
            >
                <Accordion sx={{ boxShadow: 0, margin: 0, padding: 0, '& .MuiAccordionDetails-root': { pt: 0 } }}>
                    <AccordionSummary
                        expandIcon={isOpen ? <UnfoldMore /> : null}
                        aria-controls="sidebar-content"
                        id="sidebar-header"
                    >
                        {user && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={user.profile_picture} sx={{ width: 40, height: 40, mr: 2 }} />
                                <Box sx={{ ml: 1 }}>
                                    {isOpen && (
                                        <Typography variant="subtitle1">{user.username}</Typography>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </AccordionSummary>
                    <AccordionDetails id="sidebar-content">
                        {isOpen && (
                            <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
                                </Box>
                            </Box>
                        )}
                    </AccordionDetails>
                </Accordion>
                <Divider />

                <SidebarItem icon={<DashboardIcon />} label="Dashboard" isOpen={isOpen} to={'/'} />
                <Divider />
                <SidebarItem icon={<BookIcon />} label="Subjects" isOpen={isOpen} to={'/subjects'} />
                <Divider />
                <SidebarItem icon={<PeopleIcon />} label="Candidates" isOpen={isOpen} to={'/students'} />
                <Divider />
                <SidebarItem icon={<QuestionAnswerIcon />} label="Questions" isOpen={isOpen} to={'/questions'} />
                <Divider />
                <SidebarItem icon={<AssignmentIcon />} label="Exams" isOpen={isOpen} to={'/exams'} />
                <Divider />
                <SidebarItem icon={<GradeIcon />} label="Mark Exam" isOpen={isOpen} to={'/marks'} />
                <Divider />
                <SidebarItem icon={<AssessmentIcon />} label="Result" isOpen={isOpen} to={'/result'} />
                <Divider />
                <SidebarItem icon={<HelpIcon />} label="Help & Support" isOpen={isOpen} to={'support'} />
            </Box>

            <Box sx={{ p: 2, width: '100%', textAlign: 'center', position: 'absolute', bottom: 0 }}>
                {isOpen ? (
                    <Button fullWidth variant="outlined" color="inherit" onClick={handleSignOutClick}>
                        Sign Out
                    </Button>
                ) : (
                    <IconButton onClick={handleSignOutClick}>
                        <ExitToAppIcon />
                    </IconButton>
                )}
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                    IGradePro, {new Date().getFullYear()}
                </Typography>
            </Box>


            {/* Sign Out Confirmation Dialog */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <ExitToAppIcon color="error" />
                        <Typography variant="h6">Confirm Sign Out</Typography>
                    </Stack>
                </DialogTitle>

                <DialogContent>
                    <Box mt={1}>
                        <Typography variant="body1">
                            Are you sure you want to sign out? You will be logged out of your session.
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleDialogClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmSignOut} color="error" variant="contained">
                        Sign Out
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Sidebar;