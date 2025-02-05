import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';


interface CatalogueCardProps {
    title: string;
    author: string;
    coverImage: string;
    description: string;
    pdfUrl: string;
    onMoreInfoClick: () => void;
}

const CatalogueCard: React.FC<CatalogueCardProps> = ({ title, author, coverImage, description, pdfUrl, onMoreInfoClick }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="160"
                image={coverImage}
                alt={title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" sx={{ fontSize: 18, fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                    by {author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, mt: 1 }}>
                    {description.length > 120 ? `${description.substring(0, 120)}...` : description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={onMoreInfoClick}>
                    More Info
                </Button>
                <Link to={`/library/read`} state={{ pdfUrl }}>
                    <Button size="small" color="primary">
                        Read
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default CatalogueCard;
