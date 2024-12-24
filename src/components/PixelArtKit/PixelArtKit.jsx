import React, { useState } from 'react';
import './PixelArtKit.css';

const PixelArtKit = () => {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [gridSize, setGridSize] = useState(16);
  const [pixels, setPixels] = useState(Array(gridSize * gridSize).fill('#FFFFFF'));
  
  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFFFFF', // White
    '#000000', // Black
    '#FFA500', // Orange
    '#800080', // Purple
    '#008000', // Dark Green
    '#FFC0CB', // Pink
  ];

  const handlePixelClick = (index) => {
    const newPixels = [...pixels];
    newPixels[index] = selectedColor;
    setPixels(newPixels);
  };

  const handleClear = () => {
    setPixels(Array(gridSize * gridSize).fill('#FFFFFF'));
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    setPixels(Array(size * size).fill('#FFFFFF'));
  };

  const handleSave = () => {
    const canvas = document.createElement('canvas');
    canvas.width = gridSize;
    canvas.height = gridSize;
    const ctx = canvas.getContext('2d');

    pixels.forEach((color, index) => {
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="pixel-art-kit">
      <h1 className="pixel-title">Pixel Art Creator</h1>
      
      <div className="pixel-controls">
        <div className="grid-size-controls">
          <h3>Grid Size:</h3>
          <div className="size-buttons">
            <button 
              className={`pixel-btn ${gridSize === 16 ? 'active' : ''}`}
              onClick={() => handleGridSizeChange(16)}
            >
              16x16
            </button>
            <button 
              className={`pixel-btn ${gridSize === 32 ? 'active' : ''}`}
              onClick={() => handleGridSizeChange(32)}
            >
              32x32
            </button>
          </div>
        </div>

        <div className="color-palette">
          <h3>Colors:</h3>
          <div className="color-grid">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pixel-canvas-container">
        <div 
          className="pixel-canvas"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: gridSize * 20 + 'px',
            height: gridSize * 20 + 'px'
          }}
        >
          {pixels.map((color, index) => (
            <div
              key={index}
              className="pixel"
              style={{ backgroundColor: color }}
              onClick={() => handlePixelClick(index)}
            />
          ))}
        </div>
      </div>

      <div className="pixel-actions">
        <button className="pixel-btn" onClick={handleClear}>
          Clear Canvas
        </button>
        <button className="pixel-btn" onClick={handleSave}>
          Save Artwork
        </button>
      </div>
    </div>
  );
};

export default PixelArtKit; 