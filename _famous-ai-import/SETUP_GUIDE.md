# 🚀 MedProc App - Setup Guide

## Quick Start (Demo Mode)

The app works immediately in **demo mode** without any API tokens! All features are functional with mock data.

## Adding API Tokens for Full Functionality

### Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Go to **Project Settings** → **API**
4. Copy your:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### Step 2: Add Tokens to the App

1. Open the file: `config/apiConfig.ts`
2. Replace the empty strings with your credentials:

```typescript
export const API_CONFIG = {
  supabase: {
    url: 'https://your-project.supabase.co', // Paste your URL here
    anonKey: 'eyJhbGc...your-key-here', // Paste your anon key here
  },
  
  openai: {
    apiKey: '', // Optional: Add OpenAI key for enhanced AI features
  },
  
  features: {
    enableAutoUpdates: true, // Change to true after adding tokens
    enableAIBlog: true, // Change to true after adding tokens
    enableRealTimeSync: true, // Change to true after adding tokens
  },
};
```

3. Save the file
4. Restart the app

### Step 3: Verify Configuration

1. Open the app
2. Go to **Admin Panel** → **Settings**
3. Check that status shows "✓ Configured"

## Optional: OpenAI Integration

For enhanced AI-powered blog generation:

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Add to `config/apiConfig.ts`:
   ```typescript
   openai: {
     apiKey: 'sk-your-openai-key-here',
   }
   ```

## Features Available in Demo Mode

✅ All 80+ medical procedures
✅ Search and filtering
✅ Save procedures
✅ AI Chatbot (with mock responses)
✅ Blog posts (template-based)
✅ Full navigation
✅ Profile management

## Features Enabled with API Tokens

🚀 Real-time updates from global hospitals
🚀 Live data synchronization
🚀 Enhanced AI blog generation
🚀 Cloud storage for saved procedures
🚀 Multi-device sync
🚀 Advanced analytics

## Troubleshooting

**"Invalid access token" error:**
- The app is in demo mode - this is normal!
- Add your tokens following steps above to enable full features
- The app works perfectly in demo mode for testing

**Configuration not detected:**
- Make sure you saved `config/apiConfig.ts`
- Restart the app completely
- Check that strings are not empty

## Support

For issues or questions, check the app's **Resources** section for documentation.

---

**Note:** The app is fully functional without any tokens. Add them only when you're ready for production features!
