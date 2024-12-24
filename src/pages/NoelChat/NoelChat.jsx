import React, { useState, useEffect, useRef } from 'react';
import { openai } from '../../utils/api';
import './NoelChat.css';

const NoelChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Ho ho ho! I'm NoelBot, your Christmas companion! 🎅 I can help you with:\n\n" +
        "🎄 Christmas decoration ideas\n" +
        "🎁 Gift recommendations\n" +
        "✉️ Writing Christmas cards\n" +
        "🍖 Holiday recipes\n" +
        "🎵 Christmas carols and stories\n\n" +
        "What would you like help with?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [category, setCategory] = useState('all');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userInput) => {
    try {
      const prompt = `As NoelBot, a Christmas-themed AI assistant, respond to: "${userInput}"
      
      Consider the following categories:
      1. If about decorations: Provide creative and practical decoration ideas
      2. If about gifts: Suggest personalized gift ideas based on the description
      3. If about cards: Help write heartfelt Christmas messages
      4. If about recipes: Share detailed Christmas recipes with ingredients and steps
      5. If about carols/stories: Share Christmas carol lyrics or story excerpts
      
      Respond in a warm, festive tone using Christmas-themed emojis. Include specific suggestions, steps, or examples.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response:', error);
      return "Oh dear! Even Santa's elves have technical difficulties sometimes. Could you try asking again? 🎄";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateResponse(input);
      const botMessage = {
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Oh no! Looks like some snow got in my circuits. Could you try again? 🎄❄️',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    {
      text: "Decoration ideas for small spaces",
      category: "decorations"
    },
    {
      text: "Gift ideas under $50",
      category: "gifts"
    },
    {
      text: "Traditional Christmas dinner recipe",
      category: "recipes"
    },
    {
      text: "Write a family Christmas card",
      category: "cards"
    },
    {
      text: "Tell me a Christmas story",
      category: "stories"
    }
  ];

  return (
    <div className="noel-chat">
      <div className="chat-header">
        <h2>
          <span role="img" aria-label="santa">🎅</span> 
          Ask NoelBot
          <span role="img" aria-label="christmas tree">🎄</span>
        </h2>
        <p>Your magical Christmas companion</p>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="category-selector"
        >
          <option value="all">All Categories</option>
          <option value="decorations">Decorations</option>
          <option value="gifts">Gifts</option>
          <option value="recipes">Recipes</option>
          <option value="cards">Cards</option>
          <option value="stories">Stories & Carols</option>
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
                <span>🎄</span>
                <span>🎄</span>
                <span>🎄</span>
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
            placeholder="Ask about decorations, gifts, recipes, or anything Christmas! 🎄"
          />
          <button type="submit">
            <span role="img" aria-label="send">🎅</span>
          </button>
        </form>
      </div>

      <div className="suggested-queries">
        <h3>Quick Ideas</h3>
        <div className="query-buttons">
          {quickPrompts
            .filter(prompt => category === 'all' || prompt.category === category)
            .map((prompt, index) => (
              <button 
                key={index} 
                onClick={() => setInput(prompt.text)}
                className={prompt.category}
              >
                {prompt.text}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NoelChat; 