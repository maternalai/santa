import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="pixel-footer">
      <div className="container">
        <div className="pixel-footer-content">
          <div className="pixel-footer-section">
            <h3>About PapaiNoel</h3>
            <p>Your pixel-perfect Christmas companion!</p>
          </div>
          <div className="pixel-footer-section">
            <h3>Quick Links</h3>
            <ul className="pixel-footer-links">
              <li><a href="/chat">Chat</a></li>
              <li><a href="/decorations">Decorations</a></li>
              <li><a href="/gifts">Gifts</a></li>
              <li><a href="/recipes">Recipes</a></li>
            </ul>
          </div>
          <div className="pixel-footer-section">
            <h3>Connect</h3>
            <div className="pixel-social-icons">
              <a href="#" className="pixel-social-icon">🐦</a>
              <a href="#" className="pixel-social-icon">📸</a>
              <a href="#" className="pixel-social-icon">👥</a>
            </div>
          </div>
        </div>
        <div className="pixel-footer-bottom">
          <p>&copy; 2024 PapaiNoelAi - Spreading Pixel Joy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 