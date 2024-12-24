import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const Error = ({ message }) => {
  return (
    <div className="pixel-error">
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h1 className="error-title">GAME OVER</h1>
        <p className="error-message">
          {message || "An error occurred in the Christmas matrix!"}
        </p>
        <div className="error-controls">
          <p className="retry-text">INSERT COIN TO CONTINUE</p>
          <Link to="/" className="pixel-btn retry-btn">
            RESTART GAME
          </Link>
        </div>
        <div className="pixel-decoration-top"></div>
        <div className="pixel-decoration-bottom"></div>
      </div>
    </div>
  );
};

export default Error; 