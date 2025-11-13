// API Configuration
// Add your API keys here after obtaining them

export const API_CONFIG = {
  // Supabase Configuration
  supabase: {
    url: 'https://exzypthvdefpzmmqtixt.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4enlwdGh2ZGVmcHptbXF0aXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODE2MzgsImV4cCI6MjA3NTI1NzYzOH0.KqGjZmu83pClM-WOaZKgbSKwSomhQ3TWpp--0CaW8So',
  },
  
  // OpenAI Configuration (for AI features)
  openai: {
    apiKey: '', // Add your OpenAI API key here (optional)
  },
  
  // Feature Flags
  features: {
    enableAutoUpdates: true, // Now enabled with Supabase
    enableAIBlog: false, // Enable after adding OpenAI key
    enableRealTimeSync: true, // Now enabled with Supabase
  },
};

// Check if API is configured
export const isSupabaseConfigured = () => {
  return API_CONFIG.supabase.url !== '' && API_CONFIG.supabase.anonKey !== '';
};

export const isOpenAIConfigured = () => {
  return API_CONFIG.openai.apiKey !== '';
};
