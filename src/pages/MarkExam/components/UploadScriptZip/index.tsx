import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import DisplayOutput from './DisplayOutput';
import UploadScripts from './UploadScripts';

const UploadScriptZip: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" gutterBottom>
                    Mark Exam
                </Typography>
                <div className='flex flex-row gap-4'>
                <UploadScripts />
                <Box my={4}>
                    <DisplayOutput />
                </Box>
                </div>
             
            </Box>
        </Container>
    );
};

export default UploadScriptZip;