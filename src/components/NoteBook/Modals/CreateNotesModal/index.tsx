// CreateNoteModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (noteTitle: string, noteContent: string, notebook: string) => void;
  notebooks: string[]; // List of available notebooks
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ open, onClose, onCreate, notebooks }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedNotebook, setSelectedNotebook] = useState('');

  const handleSubmit = () => {
    onCreate(noteTitle, noteContent, selectedNotebook);
    setNoteTitle(''); // Reset the title
    setNoteContent(''); // Reset the content
    setSelectedNotebook(''); // Reset the selected notebook
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Note Title"
          type="text"
          fullWidth
          variant="outlined"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Note Content"
          type="text"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <TextField
          select
          label="Select Notebook"
          fullWidth
          variant="outlined"
          margin="dense"
          value={selectedNotebook}
          onChange={(e) => setSelectedNotebook(e.target.value)}
        >
          {notebooks.map((notebook, index) => (
            <MenuItem key={index} value={notebook}>
              {notebook}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!noteTitle || !selectedNotebook}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNoteModal;
