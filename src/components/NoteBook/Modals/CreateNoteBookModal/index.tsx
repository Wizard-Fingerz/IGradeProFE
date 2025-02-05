// CreateNotebookModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface CreateNotebookModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (notebookName: string, coverImage: File | null) => void;
}

const CreateNotebookModal: React.FC<CreateNotebookModalProps> = ({ open, onClose, onCreate }) => {
  const [notebookName, setNotebookName] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onCreate(notebookName, coverImage);
    setNotebookName(''); // Reset the input field
    setCoverImage(null); // Reset the image
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Notebook</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Notebook Name"
          type="text"
          fullWidth
          variant="outlined"
          value={notebookName}
          onChange={(e) => setNotebookName(e.target.value)}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="cover-image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="cover-image-upload">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
          {coverImage ? coverImage.name : 'Upload Cover Image'}
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNotebookModal;
