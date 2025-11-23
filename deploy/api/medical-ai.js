// api/medical-ai.js - Simple Google AI Studio API
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { prompt, medicalContext = "medical procedure" } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Medical question is required',
        example: {
          prompt: 'How to perform CPR step by step?',
          medicalContext: 'emergency procedure'
        }
      });
    }

    const apiKey = process.env.GOOGLE_AI_STUDIO_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Google AI Studio API key not configured',
        instructions: 'Add GOOGLE_AI_STUDIO_KEY in Vercel project settings'
      });
    }

    const aiPrompt = `
      You are a medical expert. Provide clear, step-by-step guidance for medical procedures.
      
      User Question: ${prompt}
      Context: ${medicalContext}
      
      Please provide:
      1. Clear step-by-step instructions
      2. Required equipment/supplies
      3. Safety precautions
      4. When to seek professional medical help
      
      Format response in clear sections.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: aiPrompt
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]) {
      res.status(200).json({
        success: true,
        response: data.candidates[0].content.parts[0].text,
        model: 'gemini-pro',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'AI model returned no response',
        details: data
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
