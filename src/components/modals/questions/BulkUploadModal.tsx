import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Papa from 'papaparse'; // CSV parser
import { BASE_URL } from '../../../constant';

interface Question {
  name: string;
  code: string;
  description: string;
}

const BulkUploadQuestionsModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<Question[]>([]); // Parsed CSV data
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Validation error message

  const token = localStorage.getItem('token');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      parseCSV(selectedFile);
    } else {
      setError('Please upload a valid CSV file.');
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result: { data: Question[]; }) => {
        const parsedData = result.data as Question[];
        const invalidRows: string[] = [];
  
        // Validate parsed data
        parsedData.forEach((item, index) => {
          // Check if any required fields are missing or invalid
          if (!item.name || !item.code) {
            invalidRows.push(`Row ${index + 1}: Missing 'name' or 'code' field`);
          }
        });
  
        if (invalidRows.length > 0) {
          setError(`Invalid CSV format. Issues found in: \n${invalidRows.join("\n")}`);
          setCsvData([]);
        } else {
          setError(null);
          setCsvData(parsedData);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };
  

  const handleSubmit = async () => {
    if (!file || isLoading) return; // Make sure a file is selected
    try {
      setIsLoading(true);
  
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData
  
      const response = await fetch(`${BASE_URL}/app/Questions/bulk-upload/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData, // Send FormData containing the file
      });
  
      if (response.ok) {
        setTimeout(() => {
          setModalOpen(false);
          window.location.reload();
        }, 3000);
      } else {
        setError('Failed to upload Questions.');
      }
    } catch (error) {
      setError('An error occurred while uploading Questions.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <Button
        variant="outlined"
        sx={{
        //   backgroundColor: 'primary.main',
          color: 'primary.main',
          padding: '6px 16px',
          marginTop: 2,
          borderRadius: 2,
        }}
        onClick={() => setModalOpen(true)}
      >
        <span>Bulk Upload</span>
      </Button>

      <Dialog maxWidth="sm" fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <h1 className="text-xl font-semibold">Bulk Upload Questions</h1>
            <IconButton edge="end" color="inherit" onClick={() => setModalOpen(false)} aria-label="cancel">
              <CancelIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box mb={2}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
          </Box>

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          {/* CSV Sample Format */}
          <Box mb={2}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Sample CSV Format</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              Question_name,Question_code,description
              {"\n"}Mathematics,MATH101,Foundational course on algebra and calculus
              {"\n"}Physics,PHY101,Introduction to mechanics and thermodynamics
            </Typography>
          </Box>

          {csvData.length > 0 && (
            <Box>
              <Typography variant="h6" mb={2}>
                CSV Data Preview:
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvData.map((Question, index) => (
                    <TableRow key={index}>
                      <TableCell>{Question.name}</TableCell>
                      <TableCell>{Question.code}</TableCell>
                      <TableCell>{Question.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Box className="my-4 flex w-full justify-end gap-4">
            <Button variant="outlined" sx={{ padding: '6px 16px', borderRadius: 2 }} onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ padding: '6px 16px', borderRadius: 2 }}
              onClick={handleSubmit}
              disabled={isLoading || csvData.length === 0}
            >
              {isLoading ? <span>Uploading...</span> : <span>Upload</span>}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkUploadQuestionsModal;
