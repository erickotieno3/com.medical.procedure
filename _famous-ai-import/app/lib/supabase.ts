import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://exzypthvdefpzmmqtixt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4enlwdGh2ZGVmcHptbXF0aXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5OTU3OTUsImV4cCI6MjA0NDU3MTc5NX0.zQNhf9ZdKRVOgTkTYjI0Zy-3xjMPZPeaHjjsqwOqLgY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: Platform.OS === 'web' ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
