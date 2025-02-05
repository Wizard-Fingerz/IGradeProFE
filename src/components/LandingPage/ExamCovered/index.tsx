import { Typography, Box, Card, IconButton } from '@mui/material';
import examBodyIcon from '../../../assets/examBody/jamb.png'; // Replace with the actual path to the icon image
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

interface Exam {
    image: any;
    examBody: string;
    desc: string;
}

const EXAM_LIST: Exam[] = [
    { image: examBodyIcon, examBody: 'JAMB', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'WAEC', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'GCE', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'NECO', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'JUPEB', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'NABTEB', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'PUTME', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'IELTS', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'TOEFL', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'GRE', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'SAT', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'ACT', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'GMAT', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'LSAT', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'IJMB', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
    { image: examBodyIcon, examBody: 'ICAN', desc: 'Immersive lessons covering Mathematics,\nEnglish and Science for the perfect \nacademic head start.' },
];

const ExamCovered = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom align="center">
                We cover different examinations in Nigeria
            </Typography>

            <Box sx={{justifyContent: 'space-between', display: 'flex', alignContent: 'center'}}>
                {/* Add left arrow button */}
                <IconButton
                    sx={{
                        zIndex: 1,
                    }}
                >
                    <ArrowBackIosNew />
                </IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        padding: 2,
                        position: 'relative', // Add this
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >



                    {EXAM_LIST.map((exam, index) => (
                        <Box key={index} sx={{ marginRight: 7, flexShrink: 0 }}>
                            <Card sx={{ borderRadius: 5, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box sx={{ textAlign: 'center', padding: 1 }}>
                                    <img src={exam.image} alt={exam.examBody} width={150} height={100} />
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Typography variant="h6">{exam.examBody}</Typography>
                                        <Typography variant="caption" sx={{ whiteSpace: 'pre-wrap' }}>
                                            {exam.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Box>


                {/* Add right arrow button */}
                <IconButton
                    sx={{
                        zIndex: 1,
                    }}
                >
                    <ArrowForwardIos />
                </IconButton>

            </Box>
        </Box>


    );
};

export default ExamCovered;