import React, { useState, useEffect, useCallback } from 'react';
import './SleighRider.css';

const SleighRider = ({ onScoreChange }) => {
  const [gameState, setGameState] = useState({
    sleigh: { y: 200, velocity: 0 },
    obstacles: [],
    stars: [],
    score: 0,
    gameOver: false,
    gameStarted: false,
    distance: 0,
    speed: 5
  });

  const gravity = 0.4;
  const lift = -8;
  const maxVelocity = 10;

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameState.gameStarted) {
        if (e.code === 'Space') {
          setGameState(prev => ({ ...prev, gameStarted: true }));
        }
        return;
      }

      if (e.code === 'Space' || e.code === 'ArrowUp') {
        setGameState(prev => ({
          ...prev,
          sleigh: {
            ...prev.sleigh,
            velocity: lift
          }
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted]);

  // Game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        // Update sleigh position
        let newVelocity = prev.sleigh.velocity + gravity;
        newVelocity = Math.min(Math.max(newVelocity, -maxVelocity), maxVelocity);
        let newY = prev.sleigh.y + newVelocity;

        // Boundary checks
        if (newY < 0) newY = 0;
        if (newY > 360) {
          onScoreChange(prev.score);
          return { ...prev, gameOver: true };
        }

        // Update obstacles
        let newObstacles = [...prev.obstacles];
        if (Math.random() < 0.02) {
          const type = Math.random() < 0.7 ? 'mountain' : 'cloud';
          newObstacles.push({
            x: 800,
            y: type === 'mountain' ? 300 : Math.random() * 200 + 50,
            type
          });
        }

        // Update stars (collectibles)
        let newStars = [...prev.stars];
        if (Math.random() < 0.03) {
          newStars.push({
            x: 800,
            y: Math.random() * 300 + 50,
            collected: false
          });
        }

        // Move and filter obstacles
        newObstacles = newObstacles
          .map(obs => ({ ...obs, x: obs.x - prev.speed }))
          .filter(obs => obs.x > -50);

        // Move and filter stars
        newStars = newStars
          .map(star => ({ ...star, x: star.x - prev.speed }))
          .filter(star => star.x > -50 && !star.collected);

        // Check collisions
        const sleighBox = {
          x: 100,
          y: newY,
          width: 60,
          height: 40
        };

        // Check obstacle collisions
        const collision = newObstacles.some(obs => {
          const obsBox = {
            x: obs.x,
            y: obs.y,
            width: obs.type === 'mountain' ? 40 : 50,
            height: obs.type === 'mountain' ? 80 : 40
          };

          return (
            sleighBox.x < obsBox.x + obsBox.width &&
            sleighBox.x + sleighBox.width > obsBox.x &&
            sleighBox.y < obsBox.y + obsBox.height &&
            sleighBox.y + sleighBox.height > obsBox.y
          );
        });

        if (collision) {
          onScoreChange(prev.score);
          return { ...prev, gameOver: true };
        }

        // Check star collisions
        let newScore = prev.score;
        newStars = newStars.map(star => {
          if (!star.collected) {
            const starBox = {
              x: star.x,
              y: star.y,
              width: 30,
              height: 30
            };

            if (
              sleighBox.x < starBox.x + starBox.width &&
              sleighBox.x + sleighBox.width > starBox.x &&
              sleighBox.y < starBox.y + starBox.height &&
              sleighBox.y + sleighBox.height > starBox.y
            ) {
              newScore += 10;
              return { ...star, collected: true };
            }
          }
          return star;
        });

        // Increase speed over time
        const newSpeed = Math.min(10, 5 + Math.floor(prev.distance / 1000) * 0.5);
        const newDistance = prev.distance + prev.speed;

        return {
          ...prev,
          sleigh: { y: newY, velocity: newVelocity },
          obstacles: newObstacles,
          stars: newStars,
          score: newScore,
          distance: newDistance,
          speed: newSpeed
        };
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState.gameStarted, gameState.gameOver, onScoreChange]);

  return (
    <div className="sleigh-rider-game">
      {!gameState.gameStarted ? (
        <div className="game-start-overlay">
          <h2>Sleigh Rider</h2>
          <p>Guide Santa's sleigh through the snowy night!</p>
          <p>Press SPACE or UP to fly higher</p>
          <div className="sleigh-preview">🛷</div>
          <p>Collect stars ⭐ for bonus points!</p>
          <p>Avoid mountains 🏔️ and clouds ☁️</p>
          <button className="start-btn" onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}>
            START FLIGHT
          </button>
        </div>
      ) : (
        <div className="game-area">
          {/* Score Display */}
          <div className="game-stats">
            <div className="score">Score: {gameState.score}</div>
            <div className="distance">Distance: {Math.floor(gameState.distance)}m</div>
          </div>

          {/* Sleigh */}
          <div 
            className="sleigh"
            style={{ 
              transform: `translateY(${gameState.sleigh.y}px) rotate(${gameState.sleigh.velocity * 2}deg)`
            }}
          >
            🛷
          </div>

          {/* Obstacles */}
          {gameState.obstacles.map((obstacle, index) => (
            <div
              key={`obstacle-${index}`}
              className={`obstacle ${obstacle.type}`}
              style={{
                transform: `translateX(${obstacle.x}px) translateY(${obstacle.y}px)`
              }}
            >
              {obstacle.type === 'mountain' ? '🏔️' : '☁️'}
            </div>
          ))}

          {/* Stars */}
          {gameState.stars.map((star, index) => (
            <div
              key={`star-${index}`}
              className="star"
              style={{
                transform: `translateX(${star.x}px) translateY(${star.y}px)`
              }}
            >
              ⭐
            </div>
          ))}

          {/* Game Over Screen */}
          {gameState.gameOver && (
            <div className="game-over-overlay">
              <h2>Game Over!</h2>
              <div className="final-stats">
                <p>Score: {gameState.score}</p>
                <p>Distance: {Math.floor(gameState.distance)}m</p>
              </div>
              <button 
                className="retry-btn"
                onClick={() => {
                  setGameState({
                    sleigh: { y: 200, velocity: 0 },
                    obstacles: [],
                    stars: [],
                    score: 0,
                    gameOver: false,
                    gameStarted: true,
                    distance: 0,
                    speed: 5
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

export default SleighRider; 