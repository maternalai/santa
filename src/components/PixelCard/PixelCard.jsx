import React from 'react';
import './PixelCard.css';

const PixelCard = ({ title, icon, description, onClick }) => {
  return (
    <div className="pixel-card" onClick={onClick}>
      <div className="pixel-card-icon">{icon}</div>
      <h3 className="pixel-card-title">{title}</h3>
      <p className="pixel-card-description">{description}</p>
    </div>
  );
};

export default PixelCard; 