import { Typography, Box, Grid, Slide } from '@mui/material';
import React from 'react';
import { ConnectWithoutContact, CurrencyBitcoin, EmojiEvents, School } from '@mui/icons-material';

interface Feature {
    icon: JSX.Element;
    head: string;
    desc: string;
}

const Features: React.FC = () => {
    const FEATURE_HEAD_LIST: Feature[] = [
        {
            icon: <School />,
            head: 'Virtual Classroom',
            desc: 'Live online classes \n with interactive whiteboards, \n video conferencing, and screen sharing.'
        },
        {
            icon: <ConnectWithoutContact />,
            head: 'Social Learning Network',
            desc: 'A social network for students,\n teachers, and parents to connect,\n share, and collaborate.'
        },
        {
            icon: <CurrencyBitcoin />,
            head: 'Blockchain Integrated Rewards',
            desc: 'Earn tokens for completing Subjects,\n achieving milestones, and\n participating in activities.'
        },
        {
            icon: <EmojiEvents />,
            head: 'AI-Powered Proctored Exams',
            desc: 'Take exams with confidence \n and convenience with our AI-Powered\n Proctored Exams feature.'
        },
    ];

    return (
        <>
            <Typography variant="h4" gutterBottom align="center">
                Key Features
            </Typography>
            <Slide direction="up" timeout={1000} in appear>
                <Grid container spacing={4} justifyContent="center">
                    {FEATURE_HEAD_LIST.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}> {/* Updated Grid item sizes */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 2, display: 'inline-flex' }}>
                                    {React.cloneElement(feature.icon, { style: { color: 'white', fontSize: 35 } })}
                                </Box>
                                <Typography variant="h5" sx={{ marginTop: 1 }}>{feature.head}</Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', marginTop: 1 }}>
                                    {feature.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Slide>
        </>
    );
};

export default Features;
