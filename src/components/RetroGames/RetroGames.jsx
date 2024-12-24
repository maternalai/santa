import React, { useState, useEffect } from 'react';
import './RetroGames.css';
import SantaRun from './Games/SantaRun';
import GiftCatcher from './Games/GiftCatcher';
import SleighRider from './Games/SleighRider';
import ElfQuest from './Games/ElfQuest';

const RetroGames = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScores, setHighScores] = useState(() => {
    const savedScores = localStorage.getItem('gameHighScores');
    return savedScores ? JSON.parse(savedScores) : {
      'santa-run': 0,
      'gift-catch': 0,
      'sleigh-ride': 0,
      'elf-quest': 0
    };
  });

  const games = [
    {
      id: 'santa-run',
      title: "Santa's Pixel Run",
      description: "Help Santa deliver presents while avoiding obstacles!",
      icon: "🎅",
      difficulty: "Easy",
      highScore: highScores['santa-run']
    },
    {
      id: 'gift-catch',
      title: "Gift Catcher",
      description: "Catch falling presents in Santa's magic bag!",
      icon: "🎁",
      difficulty: "Medium",
      highScore: highScores['gift-catch']
    },
    {
      id: 'sleigh-ride',
      title: "Sleigh Rider",
      description: "Guide Santa's sleigh through a snowy pixel adventure!",
      icon: "🛷",
      difficulty: "Hard",
      highScore: highScores['sleigh-ride']
    },
    {
      id: 'elf-quest',
      title: "Elf's Workshop Quest",
      description: "Help the elves collect materials and craft toys!",
      icon: "🧝",
      difficulty: "Medium",
      highScore: highScores['elf-quest']
    }
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    const preventScroll = (e) => {
      if (gameStarted && selectedGame) {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', preventScroll);
    return () => window.removeEventListener('keydown', preventScroll);
  }, [gameStarted, selectedGame]);

  const handleScoreUpdate = (gameId, newScore) => {
    setHighScores(prevScores => {
      const updatedScores = {
        ...prevScores,
        [gameId]: Math.max(prevScores[gameId], newScore)
      };
      
      // Save to localStorage
      localStorage.setItem('gameHighScores', JSON.stringify(updatedScores));
      
      return updatedScores;
    });
  };

  return (
    <div 
      className="retro-games"
      style={{ touchAction: gameStarted ? 'none' : 'auto' }}
    >
      <div className="game-cabinet">
        <h1 className="cabinet-title">
          <span className="title-icon">🎮</span>
          Christmas Arcade
          <span className="title-icon">🎄</span>
        </h1>

        {!selectedGame ? (
          <div className="game-selection">
            <div className="game-grid">
              {games.map((game) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  onClick={() => handleGameSelect(game)}
                >
                  <div className="game-icon">{game.icon}</div>
                  <h2 className="game-title">{game.title}</h2>
                  <p className="game-description">{game.description}</p>
                  <div className="game-details">
                    <span className="difficulty">
                      Level: {game.difficulty}
                    </span>
                    <span className="high-score">
                      High Score: {highScores[game.id]}
                    </span>
                  </div>
                  <button className="play-btn">SELECT GAME</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="game-screen">
            <div className="game-header">
              <button 
                className="back-btn"
                onClick={() => setSelectedGame(null)}
              >
                ← BACK TO GAMES
              </button>
              <h2 className="current-game">{selectedGame.title}</h2>
              <div className="game-stats">
                High Score: {highScores[selectedGame.id]}
              </div>
            </div>

            {!gameStarted ? (
              <div className="game-start-screen">
                <div className="game-instructions">
                  <h3>How to Play:</h3>
                  <ul>
                    <li>Use arrow keys to move</li>
                    <li>Space to jump/action</li>
                    <li>P to pause game</li>
                  </ul>
                </div>
                <button 
                  className="start-btn"
                  onClick={startGame}
                >
                  INSERT COIN TO START
                </button>
              </div>
            ) : (
              <div className="game-play-area">
                {selectedGame.id === 'santa-run' && (
                  <div className="game-play-area">
                    <SantaRun 
                      onScoreChange={(newScore) => {
                        if (!gameStarted) setGameStarted(true);
                        handleScoreUpdate(selectedGame.id, newScore);
                      }}
                    />
                  </div>
                )}
                {selectedGame.id === 'gift-catch' && (
                  <div className="game-play-area">
                    <GiftCatcher 
                      onScoreChange={(newScore) => {
                        if (!gameStarted) setGameStarted(true);
                        handleScoreUpdate(selectedGame.id, newScore);
                      }}
                    />
                  </div>
                )}
                {selectedGame.id === 'sleigh-ride' && (
                  <div className="game-play-area">
                    <SleighRider 
                      onScoreChange={(newScore) => {
                        if (!gameStarted) setGameStarted(true);
                        handleScoreUpdate(selectedGame.id, newScore);
                      }}
                    />
                  </div>
                )}
                {selectedGame.id === 'elf-quest' && (
                  <div className="game-play-area">
                    <ElfQuest 
                      onScoreChange={(newScore) => {
                        if (!gameStarted) setGameStarted(true);
                        handleScoreUpdate(selectedGame.id, newScore);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="cabinet-controls">
          <div className="d-pad">
            <button className="d-btn up">⬆️</button>
            <button className="d-btn left">⬅️</button>
            <button className="d-btn right">➡️</button>
            <button className="d-btn down">⬇️</button>
          </div>
          <div className="action-buttons">
            <button className="action-btn">A</button>
            <button className="action-btn">B</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroGames; 