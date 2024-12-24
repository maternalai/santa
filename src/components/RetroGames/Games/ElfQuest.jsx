import React, { useState, useEffect } from 'react';
import './ElfQuest.css';

const ElfQuest = ({ onScoreChange }) => {
  const [gameState, setGameState] = useState({
    elf: { x: 400, y: 300, direction: 'right' },
    materials: [],
    toys: [],
    inventory: {
      wood: 0,
      fabric: 0,
      paint: 0
    },
    score: 0,
    gameOver: false,
    gameStarted: false,
    timeLeft: 60,
    level: 1
  });

  const [particles, setParticles] = useState([]);

  const materialTypes = {
    wood: { emoji: '🪵', color: '#8B4513' },
    fabric: { emoji: '🧶', color: '#FF69B4' },
    paint: { emoji: '🎨', color: '#4169E1' }
  };

  const toyTypes = {
    train: { materials: { wood: 2, paint: 1 }, points: 30, emoji: '🚂' },
    doll: { materials: { fabric: 2, paint: 1 }, points: 25, emoji: '👧' },
    teddyBear: { materials: { fabric: 3 }, points: 20, emoji: '🧸' }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameState.gameStarted) {
        if (e.code === 'Space') {
          setGameState(prev => ({ ...prev, gameStarted: true }));
        }
        return;
      }

      if (gameState.gameOver) return;

      const moveSpeed = 10;
      setGameState(prev => {
        let newX = prev.elf.x;
        let newY = prev.elf.y;
        let newDirection = prev.elf.direction;

        switch (e.code) {
          case 'ArrowLeft':
            newX = Math.max(0, prev.elf.x - moveSpeed);
            newDirection = 'left';
            break;
          case 'ArrowRight':
            newX = Math.min(760, prev.elf.x + moveSpeed);
            newDirection = 'right';
            break;
          case 'ArrowUp':
            newY = Math.max(0, prev.elf.y - moveSpeed);
            break;
          case 'ArrowDown':
            newY = Math.min(360, prev.elf.y + moveSpeed);
            break;
          case 'Space':
            // Try to craft toys if near workbench
            if (newX > 350 && newX < 450 && newY < 150) {
              return craftToy(prev);
            }
            break;
          default:
            break;
        }

        return {
          ...prev,
          elf: { ...prev.elf, x: newX, y: newY, direction: newDirection }
        };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted, gameState.gameOver]);

  // Game timer
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 0) {
          onScoreChange(prev.score);
          return { ...prev, gameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.gameOver, onScoreChange]);

  // Spawn materials
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const materialSpawner = setInterval(() => {
      setGameState(prev => {
        if (prev.materials.length >= 10) return prev;

        const materialTypes = ['wood', 'fabric', 'paint'];
        const type = materialTypes[Math.floor(Math.random() * materialTypes.length)];
        
        return {
          ...prev,
          materials: [...prev.materials, {
            id: Date.now(),
            type,
            x: Math.random() * 700 + 50,
            y: Math.random() * 300 + 50
          }]
        };
      });
    }, 2000);

    return () => clearInterval(materialSpawner);
  }, [gameState.gameStarted, gameState.gameOver]);

  // Collect materials and check toy crafting
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        // Check material collection
        const elfBox = {
          x: prev.elf.x,
          y: prev.elf.y,
          width: 40,
          height: 40
        };

        const newMaterials = prev.materials.filter(material => {
          const materialBox = {
            x: material.x,
            y: material.y,
            width: 30,
            height: 30
          };

          const collected = 
            elfBox.x < materialBox.x + materialBox.width &&
            elfBox.x + elfBox.width > materialBox.x &&
            elfBox.y < materialBox.y + materialBox.height &&
            elfBox.y + elfBox.height > materialBox.y;

          if (collected) {
            return false;
          }
          return true;
        });

        if (newMaterials.length !== prev.materials.length) {
          const collectedType = prev.materials.find(m => !newMaterials.includes(m))?.type;
          if (collectedType) {
            return {
              ...prev,
              materials: newMaterials,
              inventory: {
                ...prev.inventory,
                [collectedType]: prev.inventory[collectedType] + 1
              }
            };
          }
        }

        return { ...prev, materials: newMaterials };
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState.gameStarted, gameState.gameOver]);

  const createCraftingParticles = (x, y) => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / 10,
      speed: Math.random() * 2 + 1,
      life: 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  const craftToy = (prevState) => {
    for (const [toyName, toyData] of Object.entries(toyTypes)) {
      let canCraft = true;
      for (const [material, amount] of Object.entries(toyData.materials)) {
        if (prevState.inventory[material] < amount) {
          canCraft = false;
          break;
        }
      }

      if (canCraft) {
        createCraftingParticles(400, 100);
        const newInventory = { ...prevState.inventory };
        for (const [material, amount] of Object.entries(toyData.materials)) {
          newInventory[material] -= amount;
        }

        return {
          ...prevState,
          inventory: newInventory,
          score: prevState.score + toyData.points,
          toys: [...prevState.toys, { type: toyName, x: 400, y: 100 }]
        };
      }
    }
    return prevState;
  };

  // Particle animation effect
  useEffect(() => {
    if (particles.length === 0) return;

    const particleTimer = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed,
            y: p.y + Math.sin(p.angle) * p.speed,
            life: p.life - 0.02
          }))
          .filter(p => p.life > 0)
      );
    }, 1000 / 60);

    return () => clearInterval(particleTimer);
  }, [particles.length]);

  return (
    <div className="elf-quest-game">
      {!gameState.gameStarted ? (
        <div className="game-start-overlay">
          <h2>Elf's Workshop Quest</h2>
          <p>Collect materials and craft toys!</p>
          <p>Use arrow keys to move</p>
          <p>Space to craft at the workbench ⚒️</p>
          <div className="material-guide">
            {Object.entries(materialTypes).map(([type, data]) => (
              <div key={type} className="material-item">
                <span>{data.emoji}</span>
                <span>{type}</span>
              </div>
            ))}
          </div>
          <div className="toy-guide">
            {Object.entries(toyTypes).map(([type, data]) => (
              <div key={type} className="toy-item">
                <span>{data.emoji}</span>
                <span>{Object.entries(data.materials).map(([mat, amt]) => 
                  `${amt} ${mat}`).join(' + ')}
                </span>
              </div>
            ))}
          </div>
          <button className="start-btn" onClick={() => setGameState(prev => ({ ...prev, gameStarted: true }))}>
            START CRAFTING
          </button>
        </div>
      ) : (
        <div className="game-area">
          {/* Workshop Background with Snow */}
          <div className="workshop-background">
            <div className="snow-layer"></div>
          </div>

          <div className="workbench">
            <div className="workbench-glow">⚒️</div>
          </div>

          {/* Particles */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className="craft-particle"
              style={{
                left: particle.x,
                top: particle.y,
                opacity: particle.life,
                backgroundColor: particle.color
              }}
            />
          ))}

          {/* Updated Elf Character */}
          <div 
            className={`elf ${gameState.elf.direction}`}
            style={{ 
              transform: `translate(${gameState.elf.x}px, ${gameState.elf.y}px) 
                         ${gameState.elf.direction === 'left' ? 'scaleX(-1)' : ''}`
            }}
          >
            <div className="elf-character">🧝</div>
            <div className="elf-shadow"></div>
          </div>

          {/* Updated Materials with Glow */}
          {gameState.materials.map((material) => (
            <div
              key={material.id}
              className="material-wrapper"
              style={{
                transform: `translate(${material.x}px, ${material.y}px)`
              }}
            >
              <div className="material-glow"></div>
              <div className="material">
                {materialTypes[material.type].emoji}
              </div>
            </div>
          ))}

          {/* Updated Toys with Effects */}
          {gameState.toys.map((toy, index) => (
            <div
              key={index}
              className="toy-wrapper"
              style={{
                transform: `translate(${toy.x}px, ${toy.y}px)`
              }}
            >
              <div className="toy-sparkle"></div>
              <div className="toy">
                {toyTypes[toy.type].emoji}
              </div>
            </div>
          ))}

          {/* Game Stats */}
          <div className="game-stats">
            <div className="time">Time: {gameState.timeLeft}s</div>
            <div className="score">Score: {gameState.score}</div>
            <div className="inventory">
              {Object.entries(gameState.inventory).map(([type, amount]) => (
                <div key={type} className="inventory-item">
                  <span>{materialTypes[type].emoji}</span>
                  <span>{amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState.gameOver && (
            <div className="game-over-overlay">
              <h2>Time's Up!</h2>
              <div className="final-stats">
                <p>Toys Crafted: {gameState.toys.length}</p>
                <p>Score: {gameState.score}</p>
              </div>
              <button 
                className="retry-btn"
                onClick={() => {
                  setGameState({
                    elf: { x: 400, y: 300, direction: 'right' },
                    materials: [],
                    toys: [],
                    inventory: { wood: 0, fabric: 0, paint: 0 },
                    score: 0,
                    gameOver: false,
                    gameStarted: true,
                    timeLeft: 60,
                    level: 1
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

export default ElfQuest; 