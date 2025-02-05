// RecentNotesCard.tsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';

interface RecentNote {
    title: string;
    date: string;
    notebook: string;
  }
  

const RecentNotesCard: React.FC<{ recentNotes: RecentNote[] }> = ({ recentNotes }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        <NoteIcon fontSize="small" /> Recent Notes
      </Typography>
      <List>
        {recentNotes.map((note, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={note.title}
              secondary={`From: ${note.notebook} | ${note.date}`}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default RecentNotesCard;
