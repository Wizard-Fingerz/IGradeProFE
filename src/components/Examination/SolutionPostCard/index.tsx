import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Comment, CloseSharp, ArrowUpward, ArrowDownward, Share } from '@mui/icons-material';

interface SolutionPostCardProps {
  user: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  content: string;
  imageUrl?: string;
  initialVotes: number;
  initialCommentCount: number;
  initialShareCount: number;
}

const SolutionPostCard: React.FC<SolutionPostCardProps> = ({
  user,
  date,
  content,
  imageUrl,
  initialVotes,
  initialCommentCount,
  initialShareCount,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [shareCount, setShareCount] = useState(initialShareCount);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState('');

  const handleUpvote = () => setVotes(votes + 1);
  const handleDownvote = () => setVotes(votes - 1);

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput('');
      setCommentCount(commentCount + 1); // Update comment count
    }
  };

  const handleShare = () => {
    // Logic to share the post goes here
    setShareCount(shareCount + 1); // Update share count
  };

  return (
    <Card sx={{ marginBottom: 2, width: '50vw' }}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.name}
        subheader={date}
        action={
          <IconButton aria-label="cancel">
            <CloseSharp />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1" paragraph sx={{ overflow: 'hidden', wordBreak: 'break-word' }}>
          {content}
        </Typography>
        {imageUrl && (
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              marginTop: 2,
            }}
            alt="post image"
            src={imageUrl}
          />
        )}
      </CardContent>
      <CardActions>
        <Box sx={{ width: 150, backgroundColor: 'black', borderRadius: 4, padding: 0.1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={handleUpvote} sx={{ color: 'white', fontSize: 12 }}>
            <ArrowUpward />
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>
            Upvote {votes}
          </Typography>
          <IconButton onClick={handleDownvote} sx={{ color: 'white', fontSize: 12 }}>
            <ArrowDownward />
          </IconButton>
        </Box>
        <Box sx={{width: 150, bgcolor: 'black', p: 0.1, pr: 2, borderRadius: 4, display: 'flex',justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton sx={{ fontSize: 12, color: 'white' }}>
            <Comment />
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>
            {commentCount}
          </Typography>
        
        
           <IconButton sx={{ fontSize: 12, color: 'white' }} onClick={handleShare}>
            <Share />
          </IconButton>
          <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>
            {shareCount}
          </Typography>
        </Box>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Comments
        </Typography>
        {comments.map((comment, index) => (
          <Typography variant="body2" key={index}>
            {comment}
          </Typography>
        ))}
        <Box mt={2} display="flex">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Add a comment..."
            fullWidth
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
          />
          <Button onClick={handleCommentSubmit} sx={{ ml: 1 }}>
            Post
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SolutionPostCard;
