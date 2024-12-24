import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Christmas countdown calculator
  const calculateDaysUntilChristmas = () => {
    const today = new Date();
    const christmas = new Date(today.getFullYear(), 11, 25);
    if (today > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1);
    }
    return Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));
  };

  // Feature cards data
  const christmasFeatures = [
    {
      emoji: '🎄',
      title: 'PIXEL DECORATIONS',
      description: 'Transform your space into an 8-bit winter wonderland',
      link: '/decorations',
      linkText: 'DECK THE HALLS'
    },
    {
      emoji: '🎁',
      title: 'GIFT QUESTS',
      description: 'Level up your gift-giving game with perfect presents',
      link: '/gifts',
      linkText: 'START QUEST'
    },
    {
      emoji: '🍪',
      title: 'RECIPE SCROLLS',
      description: 'Unlock legendary Christmas treats and potions',
      link: '/recipes',
      linkText: 'COOK NOW'
    },
    {
      emoji: '🎵',
      title: 'FESTIVE TALES',
      description: 'Discover pixel-perfect Christmas stories and carols',
      link: '/stories',
      linkText: 'BEGIN TALE'
    }
  ];

  // Spirit features data
  const spiritFeatures = [
    {
      icon: '🤖',
      title: '[PAPAI-NOEL AI v1.0]',
      subtitle: 'CHRISTMAS POWER: 100%'
    },
    {
      icon: '✨',
      title: '[CUSTOM QUESTS]',
      subtitle: 'MAGIC LEVEL: MAX'
    },
    {
      icon: '🎨',
      title: '[HOLIDAY SKILLS]',
      subtitle: 'CREATIVITY: 999'
    }
  ];

  return (
    <div className="home">
      {/* Snow Animation Overlay */}
      <div className="snow-overlay"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title pixel-glow">
              WELCOME TO PAPAI NOEL AI
              <span className="pixel-cursor">_</span>
            </h1>
            <p className="hero-subtitle">Your 8-bit Christmas Companion 🎄</p>
            <div className="countdown-box pixel-border">
              <h2>MERRY CHRISTMAS!</h2>
            </div>
            <div className="countdown-box pixel-border">
            <Link to="/chat" className="start-button">
              START CHRISTMAS WISHES
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title pixel-outline">SELECT YOUR MISSION</h2>
          <div className="features-grid">
            {christmasFeatures.map((feature, index) => (
              <div key={index} className="feature-card pixel-border">
                <span role="img" aria-label={feature.title} className="feature-emoji">
                  {feature.emoji}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className={`feature-button ${feature.link.replace('/', '')}`}
                >
                  {feature.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spirit Section */}
      <section className="spirit-section">
        <div className="container">
          <div className="spirit-content pixel-border">
            <h2 className="section-title pixel-glow">LEVEL UP YOUR CHRISTMAS!</h2>
            <p className="pixel-description">
              PRESS START TO UNLOCK CHRISTMAS MAGIC!<br/>
              SELECT YOUR HOLIDAY QUEST FROM OUR 8-BIT WONDERLAND
            </p>
            <div className="spirit-grid">
              {spiritFeatures.map((item, index) => (
                <div key={index} className="spirit-card pixel-border">
                  <span className="spirit-icon">{item.icon}</span>
                  <p className="spirit-title">{item.title}</p>
                  <p className="spirit-subtitle">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candy Cane Border Decoration */}
      <div className="candy-cane-border"></div>
    </div>
  );
};

export default Home; 