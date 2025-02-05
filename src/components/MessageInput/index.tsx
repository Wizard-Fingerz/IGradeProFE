import React, { useState, useRef } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearIcon from '@mui/icons-material/Clear';
import StopIcon from '@mui/icons-material/Stop';

interface MessageInputProps {
  onSend: (message: string, audioBlob?: Blob) => void;
  onTyping: () => void;
  onAttachFile: (file: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, onTyping, onAttachFile }) => {
  const [message, setMessage] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [playing, setPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle typing
  const handleTyping = () => {
    onTyping();
  };

  // Handle send button
  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    } else if (audioBlob) {
      onSend('', audioBlob);
      resetAudio();
    }
  };

  // Handle file attachment
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAttachFile(file);
    }
  };

  // Start recording voice
  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioBlob(audioBlob);
      setAudioUrl(audioUrl);
    };
  };

  // Stop recording voice
  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  // Reset recorded audio
  const resetAudio = () => {
    setAudioUrl(null);
    setAudioBlob(null);
  };

  // Handle play/pause for recorded audio
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#fff',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '8px'
      }}
    >
      {/* File Attachment */}
      <input
        accept="image/*,video/*,.pdf,.doc,.docx"
        type="file"
        id="attachment"
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

      {/* Text Field for Messages */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        sx={{ marginLeft: 1, marginRight: 1 }}
      />

      {/* Voice Recording */}
      <Tooltip title="Hold to Record Voice Message">
        <IconButton
          color={recording ? 'secondary' : 'primary'}
          onMouseDown={startRecording}   // Start recording on button press
          onMouseUp={stopRecording}      // Stop recording on button release
        >
          <MicIcon />
        </IconButton>
      </Tooltip>

      {/* Play recorded audio */}
      {audioUrl && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handlePlayPause}>
            {playing ? <StopIcon /> : <PlayArrowIcon />}
          </IconButton>
          <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
          <IconButton onClick={resetAudio}>
            <ClearIcon />
          </IconButton>
        </Box>
      )}

      {/* Send Button */}
      <Tooltip title="Send Message">
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MessageInput;
