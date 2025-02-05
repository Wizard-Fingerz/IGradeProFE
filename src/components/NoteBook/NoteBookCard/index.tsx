import { Search } from "@mui/icons-material";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

export const NotebooksCard: React.FC<{ notebooks: string[] }> = ({ notebooks }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Search fontSize="small" /> Most Searched Notebooks
        </Typography>
        <List>
          {notebooks.map((notebook, index) => (
            <ListItem key={index}>
              <ListItemText primary={notebook} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );