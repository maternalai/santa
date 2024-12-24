import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="pixel-header">
      <div className="container">
        <Link to="/" className="pixel-logo">
          Papai Noel Ai
        </Link>
        <nav className="pixel-nav">
          <Link to="/chat" className="pixel-nav-item">Chat</Link>
          <Link to="/decorations" className="pixel-nav-item">Decorations</Link>
          <Link to="/gifts" className="pixel-nav-item">Gifts</Link>
          <Link to="/recipes" className="pixel-nav-item">Recipes</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 