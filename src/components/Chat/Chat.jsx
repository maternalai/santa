import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }]);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Ho ho ho! Santa's communication device seems to be having troubles. Please try again in a moment!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="welcome-message">
          <h2>🎅 Chat with Papai Noel! 🎄</h2>
          <p>Ho ho ho! I'm Papai Noel! Tell me what you'd like for Christmas!</p>
        </div>
        
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'user' ? 'user-message' : 'santa-message'}`}
          >
            {message.role === 'assistant' && <span className="santa-emoji">🎅</span>}
            <p>{message.content}</p>
          </div>
        ))}
        
        {isLoading && (
          <div className="message santa-message">
            <span className="santa-emoji">🎅</span>
            <p className="typing-indicator">Santa is typing...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>🎄 Oops! {error}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tell Santa what you want for Christmas..."
          className="chat-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="send-button" 
          disabled={isLoading || !input.trim()}
        >
          🎁 Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 