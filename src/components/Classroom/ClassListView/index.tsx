import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import { Description as DescriptionIcon, Chat as ChatIcon } from '@mui/icons-material';
import JoinClassModal from '../JoinClassModal';
import ClassDetailsModal from '../ClassDetailsModal';
import { useNavigate } from 'react-router-dom';

interface ListViewProps {
  title: string;
  tags: string[];
  avatars: string[];
  fileCount: number;
  commentCount: number;
  classDetails: {
    title: string;
    description: string;
    terms: string;
  };
}

const ListView: React.FC<ListViewProps> = ({
  title,
  tags,
  avatars,
  fileCount,
  commentCount,
  classDetails,
}) => {
  const navigate = useNavigate();

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const handleOpenDetailsModal = () => setDetailsModalOpen(true);
  const handleCloseDetailsModal = () => setDetailsModalOpen(false);

  const handleNextFromDetails = () => {
    setDetailsModalOpen(false);
    setJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => setJoinModalOpen(false);
  const handleJoinClass = () => {
    setJoinModalOpen(false);
    // Handle class join logic here
    navigate('/classroom/:id');

  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          mb: 2,
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={handleOpenDetailsModal}
      >
        <Box sx={{ width: '50%' }}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {tags.map((tag, index) => (
              <Box
                key={index}
                sx={{
                  mr: 1,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: index === 0 ? 'grey.200' : index === 1 ? 'blue.200' : 'yellow.200',
                  color: index === 0 ? 'text.primary' : index === 1 ? 'blue.800' : 'yellow.800',
                }}
              >
                {tag}
              </Box>
            ))}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Files" arrow>
            <IconButton sx={{ color: '#9333EA', mr: 1 }}>
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" color="#9333EA">
            {fileCount}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Comments" arrow>
            <IconButton sx={{ color: '#B3261E', mr: 1 }}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" color="#B3261E">
            {commentCount}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {avatars.slice(0, 2).map((avatar, index) => (
            <Avatar key={index} alt="Profile" src={avatar} sx={{ width: 24, height: 24, mr: 1 }} />
          ))}
          {avatars.length > 2 && (
            <Typography variant="caption" color="textSecondary">
              +{avatars.length - 2}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Class Details Modal */}
      <ClassDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        onNext={handleNextFromDetails}
        classDetails={classDetails}
      />

      {/* Join Class Modal */}
      <JoinClassModal
        open={joinModalOpen}
        onClose={handleCloseJoinModal}
        onJoin={handleJoinClass}
      />
    </>
  );
};

export default ListView;
