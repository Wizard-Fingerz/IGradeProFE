// src/components/Card.tsx
import React from 'react';
import './Card.css'; // Import the CSS for the Card styling

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  footer?: React.ReactNode; // Optional footer (for buttons, links, etc.)
  children?: React.ReactNode; // Allows to pass additional JSX elements inside the card
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, footer, children }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {children && <div className="card-extra">{children}</div>}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
