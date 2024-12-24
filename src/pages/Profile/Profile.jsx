import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userStats = {
    totalBets: 156,
    wonBets: 89,
    totalStaked: "25.5 ETH",
    totalWon: "35.2 ETH",
    winRate: "57%",
    favoriteLeague: "Premier League",
    lastBets: [
      { id: 1, match: "Liverpool vs Chelsea", result: "won", amount: "0.5 ETH", profit: "+0.75 ETH" },
      { id: 2, match: "Barcelona vs Real Madrid", result: "lost", amount: "0.3 ETH", profit: "-0.3 ETH" },
      { id: 3, match: "Bayern vs Dortmund", result: "won", amount: "0.4 ETH", profit: "+0.6 ETH" }
    ]
  };

  const transactions = [
    { id: 1, type: "Deposit", amount: "1.0 ETH", status: "completed", date: "2024-03-15" },
    { id: 2, type: "Withdrawal", amount: "2.5 ETH", status: "pending", date: "2024-03-14" },
    { id: 3, type: "Deposit", amount: "0.5 ETH", status: "completed", date: "2024-03-12" }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/100" alt="Profile" />
            <div className="edit-avatar">
              <span role="img" aria-label="edit">✏️</span>
            </div>
          </div>
          <div className="profile-details">
            <h2>John Doe</h2>
            <p>Member since March 2024</p>
            <div className="wallet-address">
              0x1234...5678
              <button className="copy-btn">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Bets</h3>
                <p>{userStats.totalBets}</p>
              </div>
              <div className="stat-card">
                <h3>Win Rate</h3>
                <p>{userStats.winRate}</p>
              </div>
              <div className="stat-card">
                <h3>Total Staked</h3>
                <p>{userStats.totalStaked}</p>
              </div>
              <div className="stat-card">
                <h3>Total Won</h3>
                <p>{userStats.totalWon}</p>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {userStats.lastBets.map(bet => (
                  <div key={bet.id} className={`activity-item ${bet.result}`}>
                    <div className="activity-info">
                      <h4>{bet.match}</h4>
                      <p>Stake: {bet.amount}</p>
                    </div>
                    <div className="activity-result">
                      <span>{bet.profit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-section">
            <div className="transaction-actions">
              <button className="action-btn deposit">Deposit</button>
              <button className="action-btn withdraw">Withdraw</button>
            </div>
            <div className="transactions-list">
              {transactions.map(tx => (
                <div key={tx.id} className="transaction-item">
                  <div className="transaction-info">
                    <h4>{tx.type}</h4>
                    <p>{tx.date}</p>
                  </div>
                  <div className="transaction-amount">
                    <span>{tx.amount}</span>
                    <span className={`status ${tx.status}`}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <div className="settings-group">
              <h3>Account Settings</h3>
              <div className="setting-item">
                <label>Email</label>
                <input type="email" value="john@example.com" readOnly />
                <button className="edit-btn">Edit</button>
              </div>
              <div className="setting-item">
                <label>Username</label>
                <input type="text" value="JohnDoe" readOnly />
                <button className="edit-btn">Edit</button>
              </div>
            </div>
            
            <div className="settings-group">
              <h3>Preferences</h3>
              <div className="setting-item">
                <label>Odds Format</label>
                <select defaultValue="decimal">
                  <option value="decimal">Decimal</option>
                  <option value="fractional">Fractional</option>
                  <option value="american">American</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Notifications</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="notifications" defaultChecked />
                  <label htmlFor="notifications">Enable notifications</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 