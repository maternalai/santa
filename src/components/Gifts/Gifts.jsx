import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gifts.css';

const Gifts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const giftCategories = [
    { id: 'all', name: 'All Gifts' },
    { id: 'games', name: 'Next Year Gifts' },
  ];

  const giftItems = [
    {
      id: 1,
      title: "Christmas Arcade",
      category: "games",
      price: "Free",
      rating: 5,
      image: "🎮",
      description: "Play retro-style Christmas games!",
      link: "/retro-games"
    },
    {
      id: 2,
      title: "Pixel Art Creator",
      category: "art",
      price: "Free",
      rating: 5,
      image: "🎨",
      description: "Create your own pixel masterpieces",
      link: "/pixel-art"
    },
    // Add more gift items...
  ];

  const filteredGifts = giftItems.filter(gift => 
    selectedCategory === 'all' || gift.category === selectedCategory
  );

  return (
    <div className="pixel-gifts">
      <h1 className="section-title">Gift Selection Screen</h1>
      
      <div className="gift-categories">
        {giftCategories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>


      <div className="special-section games-section">
        <div className="special-content">
          <h2 className="special-title">🎮 Christmas Arcade Games! 🎄</h2>
          <p className="special-description">
            Experience the joy of retro Christmas gaming with our pixel-perfect arcade collection
          </p>
          <Link to="/retro-games" className="special-btn arcade-btn">
            Enter Arcade
          </Link>
        </div>
      </div>

      <div className="special-section">
        <div className="special-content">
          <h2 className="special-title">Create Custom Pixel Art Gifts! 🎨</h2>
          <p className="special-description">
            Make your gifts extra special with personalized pixel art creations
          </p>
          <Link to="/pixel-art" className="special-btn">
            Open Pixel Art Studio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gifts; 