import { FlashOn } from "@mui/icons-material";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

interface Flashcard {
    title: string;
    date: string;
  }
  

export const FlashcardsCard: React.FC<{ flashcards: Flashcard[] }> = ({ flashcards }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <FlashOn fontSize="small" /> Recently Used Flashcards
        </Typography>
        <List>
          {flashcards.map((flashcard, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={flashcard.title}
                secondary={`Reviewed: ${flashcard.date}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );