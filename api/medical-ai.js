// api/medical-ai.js - Google AI Studio Medical Assistant
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { prompt, medicalContext } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Medical prompt is required',
        example: {
          prompt: 'How to perform CPR?',
          medicalContext: 'emergency procedure'
        }
      });
    }

    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_AI_STUDIO_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Google AI Studio API key not configured',
        message: 'Please set GOOGLE_AI_STUDIO_KEY environment variable in Vercel'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Enhanced medical context prompt
    const medicalPrompt = `
      You are a medical procedure assistant. Provide clear, step-by-step guidance for medical procedures.
      
      CONTEXT: ${medicalContext || 'general medical procedure'}
      USER REQUEST: ${prompt}
      
      Please provide:
      1. Step-by-step procedure
      2. Required equipment
      3. Safety precautions
      4. When to seek professional help
      
      Format response in clear sections.
    `;

    const result = await model.generateContent(medicalPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      procedure: text,
      timestamp: new Date().toISOString(),
      model: 'gemini-pro'
    });

  } catch (error) {
    console.error('Google AI Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      suggestion: 'Check your API key and try again'
    });
  }
};
