import React from 'react';
import './MyBets.css';

const MyBets = () => {
  const bets = [
    {
      id: 1,
      match: "Manchester United vs Liverpool",
      betType: "Home Win",
      amount: "0.5 ETH",
      odds: 2.5,
      status: "active",
      potentialWin: "1.25 ETH"
    },
    {
      id: 2,
      match: "Real Madrid vs Barcelona",
      betType: "Over 2.5 Goals",
      amount: "0.3 ETH",
      odds: 1.95,
      status: "won",
      potentialWin: "0.585 ETH"
    },
    {
      id: 3,
      match: "Bayern Munich vs Dortmund",
      betType: "Away Win",
      amount: "0.2 ETH",
      odds: 3.2,
      status: "lost",
      potentialWin: "0.64 ETH"
    }
  ];

  return (
    <div className="mybets-page">
      <div className="mybets-header">
        <h2>My Bets</h2>
        <div className="bet-filters">
          <button className="bet-filter active">All Bets</button>
          <button className="bet-filter">Active</button>
          <button className="bet-filter">Won</button>
          <button className="bet-filter">Lost</button>
        </div>
      </div>

      <div className="bets-container">
        {bets.map(bet => (
          <div key={bet.id} className={`bet-card ${bet.status}`}>
            <div className="bet-header">
              <h3>{bet.match}</h3>
              <span className="bet-status">{bet.status}</span>
            </div>
            <div className="bet-details">
              <div className="bet-info">
                <label>Bet Type</label>
                <span>{bet.betType}</span>
              </div>
              <div className="bet-info">
                <label>Amount</label>
                <span>{bet.amount}</span>
              </div>
              <div className="bet-info">
                <label>Odds</label>
                <span>{bet.odds}</span>
              </div>
              <div className="bet-info">
                <label>Potential Win</label>
                <span>{bet.potentialWin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBets; 