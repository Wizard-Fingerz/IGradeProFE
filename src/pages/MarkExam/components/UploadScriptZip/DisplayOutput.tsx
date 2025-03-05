import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Card, CardContent, Divider, Box, TextField, Button } from '@mui/material';
import { BASE_URL } from '../../../../constant';

interface Page {
    page_number: number | null;
    image: string;
    extracted_text: string;
    extracted_answers: string[];
}

interface ScriptOutput {
    id: number;
    subject: string;
    uploaded_at: string;
    pages: Page[];
}

const DisplayOutput: React.FC = () => {
    const [output, setOutput] = useState<ScriptOutput[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        subject: '',
        date: '',
        student: ''
    });

    useEffect(() => {
        const fetchOutput = async () => {
            try {
                const response = await fetch(`${BASE_URL}/app/scripts`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ScriptOutput[] = await response.json(); // Assume API returns an array of scripts
                setOutput(data);
            } catch (error) {
                console.error('Error fetching output:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOutput();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const filteredOutput = output?.filter(script => {
        return (
            (filters.subject === '' || script.subject.includes(filters.subject)) &&
            (filters.date === '' || new Date(script.uploaded_at).toLocaleDateString().includes(filters.date)) &&
            (filters.student === '' || script.pages.some(page => page.extracted_text.includes(filters.student)))
        );
    });

    return (
        <div className="">
            <Typography variant="h4" className="mb-4 text-center">
                Uploaded Scripts and Extracted Text
            </Typography>
            <Box className="mb-4">
                <TextField
                    label="Subject"
                    name="subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    variant="outlined"
                    className="mr-2"
                />
                <TextField
                    label="Date Uploaded"
                    name="date"
                    type="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    variant="outlined"
                    className="mr-2"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Student"
                    name="student"
                    value={filters.student}
                    onChange={handleFilterChange}
                    variant="outlined"
                    className="mr-2"
                />
                <Button variant="contained" color="primary" onClick={() => setFilters({ subject: '', date: '', student: '' })}>
                    Clear Filters
                </Button>
            </Box>
            {loading ? (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) : filteredOutput && filteredOutput.length > 0 ? (
                <Box className="space-y-4" sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {filteredOutput.map((script) => (
                        <Card key={script.id} className="shadow-lg">
                            <CardContent>
                                <Typography variant="h5" className="font-semibold mb-2">
                                    {script.subject}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" className="mb-2">
                                    Uploaded at: {new Date(script.uploaded_at).toLocaleString()}
                                </Typography>
                                {script.pages.map((page, idx) => (
                                    <div key={idx} className="mb-4">
                                        <Divider className="my-2" />
                                        <Typography variant="subtitle1" className="font-medium">
                                            Page {page.page_number !== null ? page.page_number : 'N/A'}:
                                        </Typography>
                                        <Box className="flex flex-col md:flex-row">
                                            <img
                                                src={`${BASE_URL}${page.image}`}
                                                alt={`Page ${page.page_number}`}
                                                className="w-full md:w-1/2 mb-2 md:mb-0 md:mr-4"
                                            />
                                            <Box className="flex flex-col">
                                                <Typography variant="body2" className="whitespace-pre-wrap mb-2">
                                                    {page.extracted_text || 'No text extracted.'}
                                                </Typography>
                                                <Typography variant="body2" className="whitespace-pre-wrap">
                                                    <strong>Extracted Answers:</strong> {Array.isArray(page.extracted_answers) ? page.extracted_answers.join(', ') : 'No answers extracted.'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" className="text-center">
                    No scripts available. Please upload a script first.
                </Typography>
            )}
        </div>
    );
};

export default DisplayOutput;