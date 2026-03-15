import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://com-medical-procedure.vercel.app/api';
const API_TIMEOUT  = 30000;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type':  'application/json',
    'Accept':        'application/json',
    'X-Platform':    Platform.OS,
    'X-App-Version': '1.0.0',
  },
});

// ── Network monitor ───────────────────────────────────────────
export const networkMonitor = {
  isConnected: true,
  connectionType: 'unknown',

  init() {
    NetInfo.addEventListener(state => {
      this.isConnected     = state.isConnected;
      this.connectionType  = state.type;
    });
  },

  async checkConnection() {
    const state = await NetInfo.fetch();
    return {
      isConnected:        state.isConnected,
      type:               state.type,
      isInternetReachable: state.isInternetReachable,
    };
  },
};

// ── Auth token helper ─────────────────────────────────────────
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch {
    return null;
  }
};

// ── Request interceptor ───────────────────────────────────────
apiClient.interceptors.request.use(
  async config => {
    const net = await networkMonitor.checkConnection();
    if (!net.isConnected) throw new Error('No internet connection');

    const token = await getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => Promise.reject(error)
);

// ── Response interceptor ──────────────────────────────────────
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: handleUnauthorized(); break;
        case 404: console.warn('Resource not found'); break;
        case 500: console.error('Server error'); break;
        default:  console.error('API error:', error.response.status);
      }
    } else if (error.request) {
      console.error('No response from server');
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ── API endpoints ─────────────────────────────────────────────
export const api = {
  // Procedures
  getProcedures:           ()         => apiClient.get('/procedures'),
  getProcedureById:        (id)       => apiClient.get(`/procedures/${id}`),
  searchProcedures:        (query)    => apiClient.get('/procedures/search', { params: { q: query } }),

  // Categories
  getCategories:           ()         => apiClient.get('/categories'),
  getProceduresByCategory: (catId)    => apiClient.get(`/categories/${catId}/procedures`),

  // Favorites
  getFavorites:            ()         => apiClient.get('/favorites'),
  addFavorite:             (id)       => apiClient.post('/favorites', { procedureId: id }),
  removeFavorite:          (id)       => apiClient.delete(`/favorites/${id}`),

  // User
  getUserProfile:          ()         => apiClient.get('/user/profile'),
  updateUserProfile:       (data)     => apiClient.put('/user/profile', data),

  // Health check
  healthCheck:             ()         => apiClient.get('/health'),
};

const handleUnauthorized = () => {
  AsyncStorage.removeItem('auth_token');
  console.log('Session expired - user must log in again');
};

export default apiClient;
