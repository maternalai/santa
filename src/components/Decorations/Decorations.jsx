import React from 'react';
import './Decorations.css';

const Decorations = () => {
  const decorations = [
    {
      title: "Pixel Tree",
      icon: "🎄",
      description: "8-bit Christmas tree with twinkling lights",
      difficulty: "Easy",
      materials: ["Green paper", "LED lights", "Scissors", "Tape"]
    },
    {
      title: "Retro Star",
      icon: "⭐",
      description: "Classic pixel star topper for your tree",
      difficulty: "Medium",
      materials: ["Gold paper", "Glue", "Template", "Glitter"]
    },
    {
      title: "Bit Wreath",
      icon: "🎍",
      description: "Digital-inspired holiday wreath",
      difficulty: "Hard",
      materials: ["Wire frame", "Green tinsel", "Red ribbon", "Lights"]
    },
    {
      title: "8-Bit Stockings",
      icon: "🧦",
      description: "Pixelated Christmas stockings",
      difficulty: "Medium",
      materials: ["Felt", "Thread", "Pattern", "Buttons"]
    }
  ];

  return (
    <div className="pixel-decorations">
      <h1 className="pixel-title">Christmas Decorations Quest</h1>
      <div className="decorations-grid">
        {decorations.map((item, index) => (
          <div key={index} className="decoration-card pixel-border">
            <div className="decoration-icon">{item.icon}</div>
            <h2 className="decoration-title">{item.title}</h2>
            <p className="decoration-description">{item.description}</p>
            <div className="decoration-difficulty">
              Level: <span className={`difficulty-${item.difficulty.toLowerCase()}`}>
                {item.difficulty}
              </span>
            </div>
            <div className="decoration-materials">
              <h3>Materials Needed:</h3>
              <ul>
                {item.materials.map((material, idx) => (
                  <li key={idx}>{material}</li>
                ))}
              </ul>
            </div>
            <button className="pixel-btn">Coming Soon</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Decorations; 