import React from 'react';
import './ChristmasLights.css';

const ChristmasLights = () => {
  return (
    <div className="christmas-lights">
      <div className="lights-row top">
        {[...Array(20)].map((_, i) => (
          <div key={`light-top-${i}`} className="light"></div>
        ))}
      </div>
      <div className="lights-row bottom">
        {[...Array(20)].map((_, i) => (
          <div key={`light-bottom-${i}`} className="light"></div>
        ))}
      </div>
    </div>
  );
};

export default ChristmasLights; 