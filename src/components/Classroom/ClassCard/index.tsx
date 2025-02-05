import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import { People as PeopleIcon, Chat as ChatIcon, AttachFile } from '@mui/icons-material';
import ClassDetailsModal from '../ClassDetailsModal';
import JoinClassModal from '../JoinClassModal';
import { useNavigate } from 'react-router-dom';

interface ClassDetails {
    title: string;
    description: string;
    terms: string;
}


interface ClassCardProps {
    className?: string;
    title: string;
    participantCount: number;
    tags: string[];
    avatars: string[];
    attachments: number;
    comments: number;
    classDetails: ClassDetails;
}

const ClassCard: React.FC<ClassCardProps> = ({
    className,
    title,
    participantCount,
    tags,
    avatars,
    attachments,
    comments,
    classDetails,
}) => {
    const navigate = useNavigate();

    // State for modal visibility
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);

    // Event handlers for modals
    const handleOpenDetailsModal = () => setDetailsModalOpen(true);
    const handleCloseDetailsModal = () => setDetailsModalOpen(false);
    const handleNextFromDetails = () => {
        setDetailsModalOpen(false);
        setJoinModalOpen(true);
    };
    const handleCloseJoinModal = () => setJoinModalOpen(false);
    const handleJoinClass = () => {
        setJoinModalOpen(false);
        // Implement class joining logic here

        navigate('/classroom/:id'); 
    };

    return (
        <>
            <Box
                className={className}
                sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 2, p: 2, mb: 2, width: '100%', cursor: 'pointer' }}
                onClick={handleOpenDetailsModal}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="h3" fontWeight="bold">
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PeopleIcon sx={{ color: '#33BFFF', mr: 0.5 }} />
                        <Typography variant="body2" color="#33BFFF">
                            {participantCount}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 1 }}>
                    {tags.map((tag, index) => (
                        <Typography
                            key={index}
                            variant="caption"
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
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {avatars.slice(0, 2).map((avatar, index) => (
                            <Avatar alt={`Profile ${index}`} src={avatar} key={index} sx={{ width: 20, height: 20, mr: 1 }} />
                        ))}
                        {avatars.length > 2 && (
                            <Typography variant="caption" color="textSecondary">
                                +{avatars.length - 2}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Attachments" arrow>
                            <IconButton sx={{ color: '#A855F7' }} onClick={(e) => e.stopPropagation()}>
                                <AttachFile />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" color="#A855F7">
                            {attachments}
                        </Typography>

                        <Tooltip title="Comments" arrow>
                            <IconButton sx={{ color: '#F59E0B' }} onClick={(e) => e.stopPropagation()}>
                                <ChatIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" color="#F59E0B">
                            {comments}
                        </Typography>
                    </Box>
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

export default ClassCard;
