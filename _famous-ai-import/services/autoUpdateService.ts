// Auto-Update Service
// Fetches latest procedures from global hospitals
import { API_CONFIG, isSupabaseConfigured } from '../config/apiConfig';

// Mock data for demo mode (when API tokens not configured)
const DEMO_MODE = !isSupabaseConfigured();

export interface UpdateSource {
  id: string;
  name: string;
  country: string;
}

const medicalSources = [
  { name: 'Johns Hopkins', url: 'https://api.hopkinsmedicine.org', region: 'USA' },
  { name: 'NHS UK', url: 'https://api.nhs.uk', region: 'UK' },
  { name: 'Mayo Clinic', url: 'https://api.mayoclinic.org', region: 'USA' },
  { name: 'Health Canada', url: 'https://api.canada.ca/health', region: 'Canada' },
  { name: 'Australian Health', url: 'https://api.health.gov.au', region: 'Australia' },
  { name: 'French Health', url: 'https://api.sante.gouv.fr', region: 'France' },
  { name: 'German Medical', url: 'https://api.bundesgesundheit.de', region: 'Germany' },
];

export { medicalSources };


export const fetchLatestProcedures = async () => {
  // If in demo mode, return mock updates
  if (DEMO_MODE) {
    console.log('⚠️ Demo Mode: Add Supabase tokens in config/apiConfig.ts for real-time updates');
    return getMockUpdates();
  }

  // Real API calls when configured
  const updates = [];
  for (const source of medicalSources) {
    try {
      const response = await fetch(source.url, {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.supabase.anonKey}`,
        },
      });
      const data = await response.json();
      updates.push({ source: source.name, data, timestamp: new Date() });
    } catch (error) {
      console.log(`Error fetching from ${source.name}:`, error);
    }
  }
  return updates;
};

// Mock updates for demo mode
const getMockUpdates = () => {
  return [
    {
      source: 'Johns Hopkins',
      data: { message: 'Demo mode - Add API tokens to enable real updates' },
      timestamp: new Date(),
    },
  ];
};

export const scheduleAutoUpdate = (interval: number = 3600000) => {
  if (DEMO_MODE) {
    console.log('⚠️ Auto-updates disabled in demo mode');
    return;
  }
  setInterval(async () => {
    await fetchLatestProcedures();
  }, interval);
};
