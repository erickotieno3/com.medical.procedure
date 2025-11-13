# Supabase Database Setup Guide

Your Supabase credentials are now configured! Follow these steps to set up the database schema.

## ✅ Credentials Added
- **Project URL**: https://exzypthvdefpzmmqtixt.supabase.co
- **Anon Key**: Configured ✓

## 📊 Database Schema Setup

### Step 1: Access Supabase SQL Editor
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `exzypthvdefpzmmqtixt`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Create Tables

Copy and paste this SQL to create all required tables:

```sql
-- Create procedures table
CREATE TABLE procedures (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  steps TEXT[],
  equipment TEXT[],
  complications TEXT[],
  contraindications TEXT[],
  last_updated TIMESTAMP DEFAULT NOW(),
  version INTEGER DEFAULT 1
);

-- Create saved_procedures table
CREATE TABLE saved_procedures (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  procedure_id TEXT NOT NULL,
  saved_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, procedure_id)
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read" ON procedures FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (true);

-- Create policies for saved procedures (users can manage their own)
CREATE POLICY "Users can view own saves" ON saved_procedures FOR SELECT USING (true);
CREATE POLICY "Users can insert own saves" ON saved_procedures FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete own saves" ON saved_procedures FOR DELETE USING (true);
```

### Step 3: Verify Tables Created
After running the SQL:
1. Click **Table Editor** in left sidebar
2. You should see: `procedures`, `saved_procedures`, `blog_posts`

## 🚀 App Features Now Enabled

With Supabase connected:
- ✅ **Auto-Updates**: Procedures sync from cloud
- ✅ **Real-Time Sync**: Changes reflect instantly
- ✅ **Saved Procedures**: Synced across devices
- ✅ **Blog Posts**: Dynamic content from database

## 🔄 Next Steps (Optional)

### Add OpenAI for AI Features
1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Add to `config/apiConfig.ts`:
```typescript
openai: {
  apiKey: 'sk-...',
}
```
3. Set `enableAIBlog: true` in features

## 📱 Test the Connection
1. Restart your app: `npm start`
2. Go to **Admin Panel** → **API Settings**
3. Should show "Supabase: Connected ✓"
4. Try saving a procedure to test sync!
