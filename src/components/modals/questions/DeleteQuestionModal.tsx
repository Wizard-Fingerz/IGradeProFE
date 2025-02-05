import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Delete } from '@mui/icons-material';
import { BASE_URL } from '../../../constant';

interface DeleteQuestionModalProps {
  questionID: number;
  btnText: string;
}

const DeleteQuestionModal = ({ questionID, btnText }: DeleteQuestionModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  const handleDeleteQuestion = async () => {
    if (!questionID) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/app/subject-questions/${questionID}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTimeout(() => {
          setModalOpen(false);
          window.location.reload(); // Reload the page after deletion
        }, 2000);
      } else {
        setError('Failed to delete Question. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred while deleting the Question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <button
              className='flex flex-row gap-4 text-red-800'
        onClick={() => setModalOpen(true)}
      >
        <Delete width={20} />
        <span>{btnText}</span>
      </button>

      <Dialog maxWidth="sm" fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <h1 className="text-xl font-semibold">Delete Question</h1>
            <IconButton edge="end" color="inherit" onClick={() => setModalOpen(false)} aria-label="cancel">
              <CancelIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to delete this Question? This action cannot be undone.
          </Typography>

          {error && <Typography color="error" variant="body2">{error}</Typography>}
        </DialogContent>

        <DialogActions>
          <Box className="my-4 flex w-full justify-end gap-4">
            <Button
              variant="outlined"
              sx={{
                padding: '6px 16px',
                borderRadius: 2,
              }}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{
                padding: '6px 16px',
                borderRadius: 2,
              }}
              onClick={handleDeleteQuestion}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteQuestionModal;
