import React from 'react';
import './StarField.css';

const StarField = ({ density = 'medium' }) => {
  return (
    <div className={`star-field ${density}`}>
      <div className="star-layer layer1"></div>
      <div className="star-layer layer2"></div>
      <div className="star-layer layer3"></div>
    </div>
  );
};

export default StarField; 