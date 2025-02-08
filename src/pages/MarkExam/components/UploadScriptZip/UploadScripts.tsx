import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, TextField, Typography, Alert, Autocomplete } from '@mui/material';
import { BASE_URL } from '../../../../constant';

interface Subject {
    id: string;
    name: string;
    code: string;
}

const UploadScripts: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch(`${BASE_URL}/app/subjects/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects');
                }
                const data = await response.json();
                setSubjects(data.results);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setError('Failed to fetch subjects');
            }
        };

        fetchSubjects();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            const allowedExtensions = ['.zip']; // Add more extensions if needed

            const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !allowedExtensions.includes(`.${fileExtension}`)) {
                setError('Only ZIP files are allowed.');
                setFile(null);
            } else {
                setError(null);
                setFile(selectedFile);
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            setError('Please select a ZIP file.');
            return;
        }

        if (!selectedSubject) {
            setError('Please select a subject.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject_id', selectedSubject.id);

        setIsLoading(true);
        setMessage('');
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/app/bulk-upload-script/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'File upload failed.');
            }

            setMessage('File uploaded successfully!');
        } catch (err) {
            console.error('Error uploading file:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <Typography variant="h4" className="mb-4">
                Upload Student Scripts
            </Typography>
            <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
                <Autocomplete
                    options={subjects}
                    getOptionLabel={(option) => `${option.name} (${option.code})`}
                    onChange={(_, newValue) => setSelectedSubject(newValue)}
                    renderOption={(props, option) => (
                        <li {...props}>
                            {option.name} ({option.code})
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Subject"
                            variant="outlined"
                            fullWidth
                            className="mb-4"
                        />
                    )}
                />
                <TextField
                    type="file"
                    onChange={handleFileChange}
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    inputProps={{ accept: '.zip' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading || !file || !selectedSubject}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Upload'}
                </Button>
            </form>
            {error && (
                <Alert severity="error" className="mt-4">
                    {error}
                </Alert>
            )}
            {message && (
                <Alert severity="success" className="mt-4">
                    {message}
                </Alert>
            )}
        </div>
    );
};

export default UploadScripts;