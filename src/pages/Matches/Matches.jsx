import React from 'react';
import './Matches.css';

const Matches = () => {
  const liveMatches = [
    {
      id: 1,
      league: "Premier League",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      score: "2 - 1",
      time: "65'",
      stats: {
        possession: { home: 60, away: 40 },
        shots: { home: 15, away: 8 },
        corners: { home: 6, away: 3 }
      }
    },
    {
      id: 2,
      league: "La Liga",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      score: "0 - 0",
      time: "32'",
      stats: {
        possession: { home: 45, away: 55 },
        shots: { home: 4, away: 6 },
        corners: { home: 2, away: 4 }
      }
    }
  ];

  return (
    <div className="matches-page">
      <div className="matches-header">
        <h2>Live Matches</h2>
        <div className="filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Premier League</button>
          <button className="filter-btn">La Liga</button>
          <button className="filter-btn">Bundesliga</button>
        </div>
      </div>

      <div className="live-matches">
        {liveMatches.map(match => (
          <div key={match.id} className="live-match-card">
            <div className="match-league">{match.league}</div>
            <div className="match-content">
              <div className="team home">
                <h3>{match.homeTeam}</h3>
              </div>
              <div className="match-details">
                <div className="score">{match.score}</div>
                <div className="time">{match.time}</div>
              </div>
              <div className="team away">
                <h3>{match.awayTeam}</h3>
              </div>
            </div>
            <div className="match-stats">
              <div className="stat">
                <span>{match.stats.possession.home}%</span>
                <label>Possession</label>
                <span>{match.stats.possession.away}%</span>
              </div>
              <div className="stat">
                <span>{match.stats.shots.home}</span>
                <label>Shots</label>
                <span>{match.stats.shots.away}</span>
              </div>
              <div className="stat">
                <span>{match.stats.corners.home}</span>
                <label>Corners</label>
                <span>{match.stats.corners.away}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches; 