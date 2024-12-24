import React, { useState, useEffect, useRef } from 'react';
import './AiChat.css';

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m your AI betting assistant. I can help you analyze matches and provide betting insights based on historical data and current team performance.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [selectedLeague, setSelectedLeague] = useState('all');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI response based on user input
  const generateAiResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Match analysis pattern
    if (input.includes('analyze') || input.includes('prediction')) {
      const teams = extractTeams(input);
      return generateMatchAnalysis(teams);
    }
    
    // Statistics pattern
    if (input.includes('statistics') || input.includes('stats')) {
      return generateStatistics();
    }
    
    // Betting strategy pattern
    if (input.includes('strategy') || input.includes('tip')) {
      return generateBettingStrategy();
    }

    // Default response
    return "I can help you with match analysis, statistics, and betting strategies. Please try asking about specific matches or teams.";
  };

  const extractTeams = (input) => {
    const teams = {
      'manchester city': { strength: 90, form: 'Excellent', injuries: 1 },
      'arsenal': { strength: 85, form: 'Good', injuries: 2 },
      'liverpool': { strength: 88, form: 'Excellent', injuries: 1 },
      'manchester united': { strength: 82, form: 'Average', injuries: 3 }
    };

    const foundTeams = Object.keys(teams).filter(team => input.includes(team));
    return foundTeams.map(team => ({ name: team, ...teams[team] }));
  };

  const generateMatchAnalysis = (teams) => {
    if (teams.length !== 2) {
      return "Please specify two teams for match analysis (e.g., 'Analyze Manchester City vs Arsenal')";
    }

    const [team1, team2] = teams;
    const strengthDiff = team1.strength - team2.strength;
    const formFactor = team1.form === 'Excellent' ? 5 : team1.form === 'Good' ? 3 : 0;
    const injuryImpact = (team2.injuries - team1.injuries) * 2;

    const winProbability = Math.min(85, Math.max(15, 50 + strengthDiff + formFactor + injuryImpact));

    return `
      Match Analysis: ${team1.name.toUpperCase()} vs ${team2.name.toUpperCase()}
      
      Win Probability: ${team1.name}: ${winProbability}% | ${team2.name}: ${(100-winProbability)}%
      
      Key Factors:
      • Team Strength: ${team1.name} (${team1.strength}/100) vs ${team2.name} (${team2.strength}/100)
      • Current Form: ${team1.name} (${team1.form}) vs ${team2.name} (${team2.form})
      • Injuries: ${team1.name} (${team1.injuries}) vs ${team2.name} (${team2.injuries})
      
      Recommendation: ${
        winProbability > 60 
          ? `Consider betting on ${team1.name} to win` 
          : winProbability < 40 
            ? `Consider betting on ${team2.name} to win`
            : 'This match is too close to call, consider X2 or Under 2.5 goals'
      }
    `;
  };

  const generateStatistics = () => {
    return `
      Recent Performance Statistics:
      
      Top Performing Teams (Last 5 matches):
      1. Manchester City: W-W-W-D-W (13 points)
      2. Liverpool: W-W-D-W-W (13 points)
      3. Arsenal: W-D-W-W-L (10 points)
      
      Goal Scoring:
      • Highest scoring: Manchester City (3.2 goals/game)
      • Best defense: Liverpool (0.8 goals conceded/game)
      
      Form Guide:
      • Most in-form: Manchester City (15 goals in 5 games)
      • Best home record: Liverpool (93% win rate)
      • Best away record: Arsenal (71% win rate)
    `;
  };

  const generateBettingStrategy = () => {
    return `
      Recommended Betting Strategies:
      
      1. Value Betting:
      • Look for odds that are higher than the calculated probability
      • Focus on under-valued teams in good form
      
      2. Statistical Approach:
      • Analyze head-to-head records
      • Consider home/away performance
      • Check team news and injuries
      
      3. Risk Management:
      • Never bet more than 5% of your bankroll
      • Use stop-loss limits
      • Consider hedge betting for important matches
      
      Current Hot Tips:
      • Over 2.5 goals in matches involving Manchester City
      • Liverpool clean sheet at home
      • Both teams to score in Arsenal matches
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        type: 'bot',
        content: generateAiResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="ai-chat">
      <div className="chat-header">
        <h2>AI Betting Assistant</h2>
        <p>Get real-time match analysis and betting insights</p>
        <select 
          value={selectedLeague} 
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="league-selector"
        >
          <option value="all">All Leagues</option>
          <option value="premier-league">Premier League</option>
          <option value="la-liga">La Liga</option>
          <option value="bundesliga">Bundesliga</option>
        </select>
      </div>
      
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-content">
                {msg.content}
              </div>
              <div className="message-timestamp">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about match analysis, team statistics, or betting advice..."
          />
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="suggested-queries">
        <h3>Quick Analysis</h3>
        <div className="query-buttons">
          <button onClick={() => setInput('Analyze Manchester City vs Arsenal')}>
            Man City vs Arsenal
          </button>
          <button onClick={() => setInput('Show current statistics')}>
            League Statistics
          </button>
          <button onClick={() => setInput('Best betting strategy')}>
            Betting Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat; 