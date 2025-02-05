// src/components/LoadingSpinner.tsx
import React from 'react';
import './LoadingSpinner.css';  // Import the CSS for styling

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
