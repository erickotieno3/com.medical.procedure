// services/networkService.js
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';

// API Configuration
const API_BASE_URL = 'https://api.medical-procedures.com/v1';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Platform': Platform.OS,
    'X-App-Version': '1.0.0'
  }
});

// Network status monitor
export const networkMonitor = {
  isConnected: true,
  connectionType: 'unknown',
  
  init: () => {
    NetInfo.addEventListener(state => {
      networkMonitor.isConnected = state.isConnected;
      networkMonitor.connectionType = state.type;
      console.log('Network status changed:', {
        connected: state.isConnected,
        type: state.type
      });
    });
  },
  
  checkConnection: async () => {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected,
      type: state.type,
      isInternetReachable: state.isInternetReachable
    };
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  async config => {
    const isConnected = await networkMonitor.checkConnection();
    if (!isConnected.isConnected) {
      throw new Error('No internet connection');
    }
    
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = Bearer ;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      
      switch (error.response.status) {
        case 401:
          handleUnauthorized();
          break;
        case 404:
          console.warn('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API error:', error.response.status);
      }
    } else if (error.request) {
      console.error('No response from server');
    } else {
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  getProcedures: () => apiClient.get('/procedures'),
  getProcedureById: (id) => apiClient.get(/procedures/),
  searchProcedures: (query) => apiClient.get('/procedures/search', { params: { q: query } }),
  
  getCategories: () => apiClient.get('/categories'),
  getProceduresByCategory: (categoryId) => apiClient.get(/categories//procedures),
  
  getFavorites: () => apiClient.get('/favorites'),
  addFavorite: (procedureId) => apiClient.post('/favorites', { procedureId }),
  removeFavorite: (procedureId) => apiClient.delete(/favorites/),
  
  getUserProfile: () => apiClient.get('/user/profile'),
  updateUserProfile: (data) => apiClient.put('/user/profile', data)
};

const getAuthToken = async () => {
  return null;
};

const handleUnauthorized = () => {
  console.log('User unauthorized - redirect to login');
};

export default apiClient;
