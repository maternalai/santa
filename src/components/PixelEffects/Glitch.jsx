import React from 'react';
import './Glitch.css';

const Glitch = ({ children, intensity = 'medium' }) => {
  return (
    <div className={`glitch-effect ${intensity}`}>
      <div className="glitch-text main">{children}</div>
      <div className="glitch-text before">{children}</div>
      <div className="glitch-text after">{children}</div>
    </div>
  );
};

export default Glitch; 