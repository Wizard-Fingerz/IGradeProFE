import { AccessTime } from "@mui/icons-material";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

export const VisitedNotesCard: React.FC<{ visitedNotes: string[] }> = ({ visitedNotes }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <AccessTime fontSize="small" /> Most Visited Notes
        </Typography>
        <List>
          {visitedNotes.map((note, index) => (
            <ListItem key={index}>
              <ListItemText primary={note} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );