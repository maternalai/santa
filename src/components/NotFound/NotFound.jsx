import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="pixel-not-found">
      <div className="not-found-container">
        <div className="not-found-icon">404</div>
        <h1 className="not-found-title">LEVEL NOT FOUND</h1>
        <p className="not-found-message">
          The Christmas level you're looking for has been teleported to another dimension!
        </p>
        <div className="pixel-santa-lost">🎅❓</div>
        <div className="not-found-controls">
          <p className="return-text">PRESS START TO RETURN</p>
          <Link to="/" className="pixel-btn return-btn">
            BACK TO MAIN MENU
          </Link>
        </div>
      </div>
      <div className="snow-particles"></div>
    </div>
  );
};

export default NotFound; 