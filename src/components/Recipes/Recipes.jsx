import React, { useState } from 'react';
import './Recipes.css';

const Recipes = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const recipes = [
    {
      id: 1,
      name: "Pixel Cookie",
      icon: "🍪",
      difficulty: "easy",
      time: "30 min",
      ingredients: [
        "2 cups flour",
        "1 cup sugar",
        "1/2 cup butter",
        "1 egg",
        "Christmas magic"
      ],
      steps: [
        "Mix dry ingredients",
        "Add wet ingredients",
        "Shape into pixels",
        "Bake with love"
      ]
    },
    {
      id: 2,
      name: "8-Bit Hot Chocolate",
      icon: "☕",
      difficulty: "medium",
      time: "15 min",
      ingredients: [
        "Milk",
        "Chocolate",
        "Marshmallows",
        "Candy cane",
        "Holiday spirit"
      ],
      steps: [
        "Heat milk",
        "Add chocolate",
        "Stir until pixelated",
        "Top with joy"
      ]
    }
    // Add more recipes...
  ];

  return (
    <div className="pixel-recipes">
      <h1 className="pixel-title">Christmas Recipe Book</h1>
      
      <div className="recipe-filters">
        <button 
          className={`filter-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('all')}
        >
          All Levels
        </button>
        <button 
          className={`filter-btn ${selectedDifficulty === 'easy' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('easy')}
        >
          Easy Quest
        </button>
        <button 
          className={`filter-btn ${selectedDifficulty === 'medium' ? 'active' : ''}`}
          onClick={() => setSelectedDifficulty('medium')}
        >
          Medium Quest
        </button>
      </div>

      <div className="recipes-grid">
        {recipes
          .filter(recipe => selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty)
          .map(recipe => (
            <div key={recipe.id} className="recipe-card pixel-border">
              <div className="recipe-icon">{recipe.icon}</div>
              <h2 className="recipe-name">{recipe.name}</h2>
              <div className="recipe-info">
                <span className={`difficulty-${recipe.difficulty}`}>
                  {recipe.difficulty.toUpperCase()}
                </span>
                <span className="recipe-time">{recipe.time}</span>
              </div>
              
              <div className="recipe-details">
                <div className="ingredients">
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="steps">
                  <h3>Quest Steps:</h3>
                  <ol>
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <button className="pixel-btn">Start Cooking</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recipes; 