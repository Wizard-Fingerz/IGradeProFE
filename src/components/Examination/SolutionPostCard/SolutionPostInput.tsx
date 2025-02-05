import React, { useState } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';

interface SolutionPostInputProps {
  onPost: (content: string, files: File[]) => void;
}

const SolutionPostInput: React.FC<SolutionPostInputProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // Handle content change
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Handle post submission
  const handleSubmit = () => {
    if (content.trim() || files.length > 0) {
      onPost(content, files);
      setContent('');
      setFiles([]);
    }
  };

  // Handle removing a file
  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#fff',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '8px',
      }}
    >
      {/* File Attachment */}
      <input
        accept="image/*,video/*,.pdf,.doc,.docx"
        type="file"
        id="attachment"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="attachment">
        <Tooltip title="Attach File">
          <IconButton color="primary" component="span">
            <AttachFileIcon />
          </IconButton>
        </Tooltip>
      </label>

      {/* Text Field for Post Content */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your solution post..."
        value={content}
        onChange={handleContentChange}
        sx={{ marginLeft: 1, marginRight: 1 }}
      />

      {/* Send Button */}
      <Tooltip title="Submit Post">
        <IconButton color="primary" onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Tooltip>

      {/* File List */}
      {files.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2 }}>
          {files.map((file) => (
            <Box key={file.name} sx={{ display: 'flex', alignItems: 'center' }}>
              <span>{file.name}</span>
              <IconButton onClick={() => removeFile(file)}>
                <ClearIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SolutionPostInput;
