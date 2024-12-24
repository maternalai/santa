import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="pixel-loading">
      <div className="loading-container">
        <div className="pixel-santa">🎅</div>
        <div className="loading-text">
          LOADING CHRISTMAS MAGIC...
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading; 