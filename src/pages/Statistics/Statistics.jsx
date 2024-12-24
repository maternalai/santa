import React, { useState } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [selectedLeague, setSelectedLeague] = useState('premier-league');
  
  const stats = {
    'premier-league': {
      topScorers: [
        { rank: 1, player: "Erling Haaland", team: "Manchester City", goals: 28 },
        { rank: 2, player: "Harry Kane", team: "Bayern Munich", goals: 25 },
        { rank: 3, player: "Mohamed Salah", team: "Liverpool", goals: 22 }
      ],
      topAssists: [
        { rank: 1, player: "Kevin De Bruyne", team: "Manchester City", assists: 15 },
        { rank: 2, player: "Bruno Fernandes", team: "Manchester United", assists: 12 },
        { rank: 3, player: "Bukayo Saka", team: "Arsenal", assists: 11 }
      ],
      teamStats: [
        { team: "Manchester City", possession: 68, shots: 425, goals: 75 },
        { team: "Liverpool", possession: 64, shots: 398, goals: 70 },
        { team: "Arsenal", possession: 62, shots: 380, goals: 65 }
      ]
    }
  };

  const upcomingFixtures = [
    {
      id: 1,
      homeTeam: "Manchester City",
      awayTeam: "Arsenal",
      date: "2024-03-31",
      time: "16:30",
      venue: "Etihad Stadium",
      odds: { home: 1.95, draw: 3.50, away: 3.80 }
    },
    {
      id: 2,
      homeTeam: "Liverpool",
      awayTeam: "Manchester United",
      date: "2024-04-03",
      time: "20:00",
      venue: "Anfield",
      odds: { home: 1.75, draw: 3.80, away: 4.50 }
    }
  ];

  const headToHead = [
    {
      date: "2023-12-15",
      homeTeam: "Arsenal",
      awayTeam: "Manchester City",
      score: "2-1",
      stats: {
        possession: { home: 55, away: 45 },
        shots: { home: 15, away: 12 },
        corners: { home: 7, away: 5 }
      }
    },
    {
      date: "2023-08-20",
      homeTeam: "Manchester City",
      awayTeam: "Arsenal",
      score: "3-1",
      stats: {
        possession: { home: 58, away: 42 },
        shots: { home: 18, away: 9 },
        corners: { home: 8, away: 4 }
      }
    }
  ];

  return (
    <div className="statistics-page">
      <div className="stats-header">
        <h2>Statistics Center</h2>
        <select 
          value={selectedLeague} 
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="league-selector"
        >
          <option value="premier-league">Premier League</option>
          <option value="la-liga">La Liga</option>
          <option value="bundesliga">Bundesliga</option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Top Scorers</h3>
          <div className="stats-table">
            {stats[selectedLeague].topScorers.map(player => (
              <div key={player.rank} className="stats-row">
                <span className="rank">{player.rank}</span>
                <div className="player-info">
                  <span className="player-name">{player.player}</span>
                  <span className="team-name">{player.team}</span>
                </div>
                <span className="stats-value">{player.goals}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>Top Assists</h3>
          <div className="stats-table">
            {stats[selectedLeague].topAssists.map(player => (
              <div key={player.rank} className="stats-row">
                <span className="rank">{player.rank}</span>
                <div className="player-info">
                  <span className="player-name">{player.player}</span>
                  <span className="team-name">{player.team}</span>
                </div>
                <span className="stats-value">{player.assists}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card full-width">
          <h3>Team Statistics</h3>
          <div className="team-stats-table">
            <div className="table-header">
              <span>Team</span>
              <span>Possession</span>
              <span>Shots</span>
              <span>Goals</span>
            </div>
            {stats[selectedLeague].teamStats.map((team, index) => (
              <div key={index} className="team-stats-row">
                <span>{team.team}</span>
                <span>{team.possession}%</span>
                <span>{team.shots}</span>
                <span>{team.goals}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>Upcoming Fixtures</h3>
          <div className="fixtures-list">
            {upcomingFixtures.map(fixture => (
              <div key={fixture.id} className="fixture-item">
                <div className="fixture-teams">
                  <span>{fixture.homeTeam}</span>
                  <span>vs</span>
                  <span>{fixture.awayTeam}</span>
                </div>
                <div className="fixture-details">
                  <span>{fixture.date} - {fixture.time}</span>
                  <span>{fixture.venue}</span>
                </div>
                <div className="fixture-odds">
                  <button>H {fixture.odds.home}</button>
                  <button>D {fixture.odds.draw}</button>
                  <button>A {fixture.odds.away}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>Head to Head</h3>
          <div className="h2h-list">
            {headToHead.map((match, index) => (
              <div key={index} className="h2h-item">
                <div className="h2h-header">
                  <span>{match.date}</span>
                  <span className="h2h-score">{match.score}</span>
                </div>
                <div className="h2h-teams">
                  <span>{match.homeTeam}</span>
                  <span>{match.awayTeam}</span>
                </div>
                <div className="h2h-stats">
                  <div className="stat-bar">
                    <div className="stat-label">Possession</div>
                    <div className="stat-values">
                      <span>{match.stats.possession.home}%</span>
                      <span>{match.stats.possession.away}%</span>
                    </div>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-label">Shots</div>
                    <div className="stat-values">
                      <span>{match.stats.shots.home}</span>
                      <span>{match.stats.shots.away}</span>
                    </div>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-label">Corners</div>
                    <div className="stat-values">
                      <span>{match.stats.corners.home}</span>
                      <span>{match.stats.corners.away}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 