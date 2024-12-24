import React, { useState, useEffect, useRef } from 'react';
import './GiftCatcher.css';

const GiftCatcher = ({ onScoreChange }) => {
  const gameRef = useRef(null);
  const [mouseControl, setMouseControl] = useState(false);
  const [sensitivity, setSensitivity] = useState(1.5);
  
  const [gameState, setGameState] = useState({
    bag: { x: 300, width: 60 },
    gifts: [],
    score: 0,
    lives: 3,
    gameOver: false,
    gameStarted: false,
    level: 1,
    baseSpeed: 3 // Base speed for gifts
  });

  // Game loop for falling gifts
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        // Update existing gifts with adjusted speed
        const newGifts = prev.gifts.map(gift => ({
          ...gift,
          y: gift.y + (gift.speed * (1 + Math.floor(prev.score / 100) * 0.1))
        }));

        // Add new gifts with adjusted speed range
        if (Math.random() < 0.02) { // Reduced spawn rate
          newGifts.push({
            x: Math.random() * (740),
            y: -30,
            type: Math.random() < 0.3 ? '🎁' : Math.random() < 0.6 ? '🎀' : '🧸',
            speed: prev.baseSpeed + (Math.random() * 1.5), // Adjusted speed range
            id: Date.now()
          });
        }

        // Level up logic
        const newLevel = Math.floor(prev.score / 100) + 1;
        const newBaseSpeed = 3 + (newLevel - 1) * 0.5; // Gradual speed increase

        // Check collisions and remove caught/missed gifts
        let newScore = prev.score;
        let newLives = prev.lives;
        const remainingGifts = newGifts.filter(gift => {
          // Check if gift is caught
          if (gift.y > 350 && gift.y < 400) {
            if (gift.x > prev.bag.x - 20 && gift.x < prev.bag.x + prev.bag.width + 20) {
              newScore += 10;
              return false;
            }
          }
          
          // Check if gift is missed
          if (gift.y > 400) {
            newLives--;
            return false;
          }
          
          return true;
        });

        // Check game over
        if (newLives <= 0) {
          onScoreChange(newScore);
          return { ...prev, gameOver: true };
        }

        return {
          ...prev,
          gifts: remainingGifts,
          score: newScore,
          lives: newLives,
          level: newLevel,
          baseSpeed: newBaseSpeed
        };
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.gameStarted, gameState.gameOver, onScoreChange]);

  // Controls
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const handleKeyPress = (e) => {
      const moveSpeed = 12 * sensitivity;
      
      setGameState(prev => {
        let newX = prev.bag.x;

        if (e.key === 'ArrowLeft') {
          newX = Math.max(0, prev.bag.x - moveSpeed);
        } else if (e.key === 'ArrowRight') {
          newX = Math.min(740, prev.bag.x + moveSpeed);
        }

        return {
          ...prev,
          bag: { ...prev.bag, x: newX }
        };
      });
    };

    const handleMouseMove = (e) => {
      if (!mouseControl || !gameRef.current) return;

      const gameRect = gameRef.current.getBoundingClientRect();
      const relativeX = e.clientX - gameRect.left;
      const gameWidth = gameRect.width;
      
      setGameState(prev => ({
        ...prev,
        bag: {
          ...prev.bag,
          x: Math.max(0, Math.min(740, (relativeX / gameWidth) * 740 * sensitivity))
        }
      }));
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameState.gameStarted, gameState.gameOver, mouseControl, sensitivity]);

  return (
    <div className="gift-catcher-game" ref={gameRef}>
      {!gameState.gameStarted ? (
        <div className="game-start-overlay">
          <h2>Gift Catcher</h2>
          <p>Catch all the falling presents!</p>
          
          <div className="control-settings">
            <div className="control-option">
              <label>
                <input
                  type="checkbox"
                  checked={mouseControl}
                  onChange={() => setMouseControl(!mouseControl)}
                />
                Use Mouse Control
              </label>
            </div>
            
            <div className="sensitivity-slider">
              <label>Movement Sensitivity: {sensitivity.toFixed(1)}</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={sensitivity}
                onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <p className="control-info">
            {mouseControl ? 
              "Move mouse to control the bag" : 
              "Use ← → arrows to move"
            }
          </p>
          <button 
            className="start-btn"
            onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}
          >
            START GAME
          </button>
        </div>
      ) : (
        <div className="game-area">
          {/* Game Stats */}
          <div className="game-stats">
            <div className="lives">{'❤️'.repeat(gameState.lives)}</div>
            <div className="level">Level: {gameState.level}</div>
            <div className="score">Score: {gameState.score}</div>
          </div>

          {/* Santa's Bag */}
          <div 
            className="catcher-bag"
            style={{ left: `${gameState.bag.x}px` }}
          >
            🎅
          </div>

          {/* Falling Gifts */}
          {gameState.gifts.map((gift) => (
            <div
              key={gift.id}
              className="falling-gift"
              style={{
                left: `${gift.x}px`,
                top: `${gift.y}px`
              }}
            >
              {gift.type}
            </div>
          ))}

          {/* Game Over Screen */}
          {gameState.gameOver && (
            <div className="game-over-overlay">
              <h2>Game Over!</h2>
              <p>Final Score: {gameState.score}</p>
              <button 
                className="retry-btn"
                onClick={() => {
                  setGameState({
                    bag: { x: 300, width: 60 },
                    gifts: [],
                    score: 0,
                    lives: 3,
                    gameOver: false,
                    gameStarted: true
                  });
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GiftCatcher; 