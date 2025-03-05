import React, { useEffect, useState } from 'react';
import {
    Box, IconButton, Typography, Divider, Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    useMediaQuery,
    useTheme,
    Avatar
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

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Use breakpoints for responsiveness
    const [user, setUser] = useState<User | null>(null);

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
                <SidebarItem icon={<PeopleIcon />} label="Students" isOpen={isOpen} to={'/students'} />
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
                    <Button fullWidth variant="outlined" color="inherit">
                        Sign Out
                    </Button>
                ) : (
                    <IconButton onClick={() => console.log('Logout clicked')}>
                        <ExitToAppIcon />
                    </IconButton>
                )}
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                    IGradePro, 2022
                </Typography>
            </Box>
        </Box>
    );
}

export default Sidebar;