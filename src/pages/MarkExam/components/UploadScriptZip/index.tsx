import React, { useEffect, useState } from 'react';
import { Box, Typography, Breadcrumbs, Link, Avatar } from '@mui/material';
import DisplayOutput from './DisplayOutput';
import UploadScripts from './UploadScripts';
import CustomInput from '../../../../components/CustomBorderedInput';
import { getProfileDetails } from '../../../../services/auth/profile';
import { User } from '../../../../types/user';

const UploadScriptZip: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchStudentMe = async () => {
            const response = await getProfileDetails();
            if (response) {
                setUser(response);
            }
        };
        fetchStudentMe();
    }, []);
    return (
        <Box className="flex flex-col gap-4">

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Breadcrumbs aria-label="breadcrumb"
                    sx={{
                        '& .MuiBreadcrumbs-li': {
                            fontSize: 28,
                            fontWeight: 600,
                        }
                    }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/students"
                    >
                        Mark Exam
                    </Link>
                    <Typography color="text.primary">Upload Script</Typography>
                </Breadcrumbs>


                <Box sx={
                    {
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
                        justifyContent: 'space-between',

                    }
                }>
                    <CustomInput />

                    <div className="top-navbar-icons">
                        <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
                    </div>

                </Box>


            </Box>


            <Box >
                <div className='flex flex-row gap-4'>
                    <UploadScripts />
                    <Box my={4}>
                        <DisplayOutput />
                    </Box>
                </div>

            </Box>

        </Box>
    );
};

export default UploadScriptZip;