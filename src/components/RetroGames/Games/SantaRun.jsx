import React, { useState, useEffect, useCallback } from 'react';
import './SantaRun.css';

const SantaRun = ({ onScoreChange }) => {
  const [gameState, setGameState] = useState({
    santa: { y: 200, jumping: false },
    obstacles: [],
    score: 0,
    gameOver: false,
    gameStarted: false
  });

  const gravity = 0.8;
  const jumpForce = -15;
  const gameSpeed = 5;

  const jump = useCallback(() => {
    if (!gameState.santa.jumping && !gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        santa: { ...prev.santa, jumping: true, velocity: jumpForce }
      }));
    }
  }, [gameState.santa.jumping, gameState.gameOver]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (!gameState.gameStarted) {
          setGameState(prev => ({ ...prev, gameStarted: true }));
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameState.gameStarted]);

  // Game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        // Update Santa's position
        let newSantaY = prev.santa.y;
        let newVelocity = prev.santa.velocity || 0;

        if (prev.santa.jumping) {
          newVelocity += gravity;
          newSantaY += newVelocity;

          // Ground collision
          if (newSantaY > 200) {
            newSantaY = 200;
            newVelocity = 0;
          }
        }

        // Generate obstacles
        let newObstacles = [...prev.obstacles];
        if (Math.random() < 0.02) {
          newObstacles.push({
            x: 800,
            type: Math.random() > 0.5 ? 'tree' : 'gift'
          });
        }

        // Update obstacles
        newObstacles = newObstacles
          .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
          .filter(obs => obs.x > -50);

        // Check collisions
        const santaBox = {
          x: 50,
          y: newSantaY,
          width: 40,
          height: 40
        };

        const collision = newObstacles.some(obs => {
          const obsBox = {
            x: obs.x,
            y: 200,
            width: 30,
            height: 40
          };

          return (
            santaBox.x < obsBox.x + obsBox.width &&
            santaBox.x + santaBox.width > obsBox.x &&
            santaBox.y < obsBox.y + obsBox.height &&
            santaBox.y + santaBox.height > obsBox.y
          );
        });

        if (collision) {
          onScoreChange(prev.score);
          return { ...prev, gameOver: true };
        }

        // Update score
        const newScore = prev.score + 1;
        onScoreChange(newScore);

        return {
          ...prev,
          santa: {
            y: newSantaY,
            jumping: newSantaY < 200,
            velocity: newVelocity
          },
          obstacles: newObstacles,
          score: newScore
        };
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.gameStarted, gameState.gameOver, onScoreChange]);

  return (
    <div className="santa-run-game">
      {!gameState.gameStarted ? (
        <div className="game-start-overlay">
          <h2>Santa's Pixel Run</h2>
          <p>Press SPACE or UP ARROW to start and jump!</p>
          <div className="pixel-santa-idle">🎅</div>
        </div>
      ) : (
        <div className="game-area">
          <div 
            className={`santa ${gameState.santa.jumping ? 'jumping' : ''}`}
            style={{ transform: `translateY(${gameState.santa.y}px)` }}
          >
            🎅
          </div>
          
          {gameState.obstacles.map((obstacle, index) => (
            <div
              key={index}
              className={`obstacle ${obstacle.type}`}
              style={{ transform: `translateX(${obstacle.x}px)` }}
            >
              {obstacle.type === 'tree' ? '🎄' : '🎁'}
            </div>
          ))}

          {gameState.gameOver && (
            <div className="game-over-overlay">
              <h2>Game Over!</h2>
              <p>Score: {gameState.score}</p>
              <button 
                className="retry-btn"
                onClick={() => {
                  setGameState({
                    santa: { y: 200, jumping: false },
                    obstacles: [],
                    score: 0,
                    gameOver: false,
                    gameStarted: true
                  });
                }}
              >
                Try Again
              </button>
            </div>
          )}

          <div className="ground"></div>
        </div>
      )}
      
      <div className="game-score">Score: {gameState.score}</div>
    </div>
  );
};

export default SantaRun; 