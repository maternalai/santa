import React from 'react';
import './PixelBorder.css';

const PixelBorder = ({ children, color = 'red', thickness = 'normal' }) => {
  return (
    <div className={`pixel-border-container ${color} ${thickness}`}>
      <div className="pixel-border-content">
        {children}
      </div>
      <div className="pixel-border-corner top-left"></div>
      <div className="pixel-border-corner top-right"></div>
      <div className="pixel-border-corner bottom-left"></div>
      <div className="pixel-border-corner bottom-right"></div>
    </div>
  );
};

export default PixelBorder; 