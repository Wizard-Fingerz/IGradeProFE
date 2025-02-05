import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../../constant';

const CreateStudentModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [studentDetails, setStudentDetails] = useState({
    firstName: '',
    otherName: '',
    lastName: '',
    centerNumber: '',
    candidateNum: '',
    examNum: '',
    examType: '',
    examYear: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creationSuccess, setCreationSuccess] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');

  const handleInputChange = (field: string, value: string) => {
    setStudentDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const onCreateStudent = async () => {
    try {
      setIsLoading(true);
      setCreationSuccess(null);

      const payload = {
        first_name: studentDetails.firstName,
        other_name: studentDetails.otherName,
        last_name: studentDetails.lastName,
        center_number: studentDetails.centerNumber,
        candidate_number: studentDetails.candidateNum,
        examination_number: studentDetails.examNum,
        exam_type: studentDetails.examType,
        year: studentDetails.examYear,
      };

      const response = await fetch(`${BASE_URL}/account/students/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setCreationSuccess(true);
        setTimeout(() => {
          setModalOpen(false);
          window.location.reload();
        }, 1000);
      } else {
        setCreationSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setCreationSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          padding: '6px 16px',
          marginTop: 2,
          borderRadius: 2,
        }}
        onClick={() => setModalOpen(true)}
      >
        <span className="px-2 py-3 text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:flex md:text-xs">
          New Student
        </span>
      </Button>

      <Dialog maxWidth="sm" fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <h1 className="text-xl font-semibold">Create Student</h1>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setModalOpen(false)}
              aria-label="cancel"
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent className="mt-4">
          <Box className="p-6 bg-gray-100 rounded-lg shadow-md">
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <Box className="space-y-4">
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={studentDetails.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Other Name"
                    variant="outlined"
                    value={studentDetails.otherName}
                    onChange={(e) => handleInputChange('otherName', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={studentDetails.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Center Number"
                    variant="outlined"
                    value={studentDetails.centerNumber}
                    onChange={(e) => handleInputChange('centerNumber', e.target.value)}
                  />
                </Box>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <Box className="space-y-4">
                  <TextField
                    fullWidth
                    label="Candidate Number"
                    variant="outlined"
                    value={studentDetails.candidateNum}
                    onChange={(e) => handleInputChange('candidateNum', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Examination Number"
                    variant="outlined"
                    value={studentDetails.examNum}
                    onChange={(e) => handleInputChange('examNum', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Examination Type"
                    variant="outlined"
                    value={studentDetails.examType}
                    onChange={(e) => handleInputChange('examType', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Examination Year"
                    variant="outlined"
                    value={studentDetails.examYear}
                    onChange={(e) => handleInputChange('examYear', e.target.value)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Box className="my-4 flex w-full justify-end gap-4">
            <Button
              variant="outlined"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                padding: '6px 16px',
                margin: 2,
                borderRadius: 2,
              }}
              onClick={() => setModalOpen(false)}
            >
              <span className="text-xs font-[500] leading-[24px] tracking-[0.4px] md:text-sm">
                Cancel
              </span>
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                padding: '6px 16px',
                margin: 2,
                borderRadius: 2,
              }}
              disabled={isLoading || creationSuccess === true}
              onClick={onCreateStudent}
            >
              {isLoading ? 'Creating...' : creationSuccess === true ? 'Created' : 'Create'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateStudentModal;
