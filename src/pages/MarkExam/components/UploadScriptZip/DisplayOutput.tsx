import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import { BASE_URL } from '../../../../constant';

interface ScriptOutput {
    scriptName: string;
    pages: {
        pageNumber: number;
        extractedText: string;
    }[];
}

const DisplayOutput: React.FC = () => {
    const [output, setOutput] = useState<ScriptOutput[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <Typography variant="h4" className="mb-4 text-center">
                Uploaded Scripts and Extracted Text
            </Typography>
            {loading ? (
                <div className="flex justify-center">
                    <CircularProgress />
                </div>
            ) : output && output.length > 0 ? (
                <div className="space-y-4">
                    {output.map((script, index) => (
                        <Card key={index} className="shadow-lg">
                            <CardContent>
                                <Typography variant="h5" className="font-semibold mb-2">
                                    {script.scriptName}
                                </Typography>
                                {script.pages.map((page, idx) => (
                                    <div key={idx} className="mb-4">
                                        <Divider className="my-2" />
                                        <Typography variant="subtitle1" className="font-medium">
                                            Page {page.pageNumber}:
                                        </Typography>
                                        <Typography variant="body2" className="whitespace-pre-wrap">
                                            {page.extractedText || 'No text extracted.'}
                                        </Typography>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Typography variant="body1" className="text-center">
                    No scripts available. Please upload a script first.
                </Typography>
            )}
        </div>
    );
};

export default DisplayOutput;
