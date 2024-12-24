require('dotenv').config();
const express = require('express');
const router = express.Router();
const openai = require('../config/openai');

const SANTA_PROMPT = `You are Santa Claus, speaking with children and adults about Christmas wishes. 
Be jolly, kind, and encouraging. Use phrases like "Ho ho ho!" and make references to the North Pole, 
elves, reindeer, and Christmas magic. Keep responses family-friendly and magical.`;

router.post('/chat', async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SANTA_PROMPT },
        { role: "user", content: req.body.message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    res.json({ 
      message: completion.data.choices[0].message.content 
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ 
      error: "Ho ho ho! Santa's magic communication device seems to be having troubles!",
      details: error.message 
    });
  }
});

module.exports = router; 