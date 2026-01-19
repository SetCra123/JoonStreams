import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Video API
export const videoAPI = {
  getAllVideos: async () => {
    const response = await apiClient.get('/videos');
    return response.data;
  },

  getFeaturedVideo: async () => {
    const response = await apiClient.get('/videos/featured');
    return response.data;
  },

  getTrendingVideos: async () => {
    const response = await apiClient.get('/videos/trending');
    return response.data;
  },

  getVideosByGenre: async (genre) => {
    const response = await apiClient.get(`/videos/genre/${genre}`);
    return response.data;
  },

  getVideoById: async (id) => {
    const response = await apiClient.get(`/videos/${id}`);
    return response.data;
  },

  searchVideos: async (query) => {
    const response = await apiClient.get(`/videos/search?q=${query}`);
    return response.data;
  },

  // Admin only
  createVideo: async (videoData) => {
    const response = await apiClient.post('/videos', videoData);
    return response.data;
  },

  updateVideo: async (id, videoData) => {
    const response = await apiClient.put(`/videos/${id}`, videoData);
    return response.data;
  },

  deleteVideo: async (id) => {
    const response = await apiClient.delete(`/videos/${id}`);
    return response.data;
  },
};

// User API
export const userAPI = {
  getMyList: async () => {
    const response = await apiClient.get('/users/my-list');
    return response.data;
  },

  addToMyList: async (videoId) => {
    const response = await apiClient.post(`/users/my-list/${videoId}`);
    return response.data;
  },

  removeFromMyList: async (videoId) => {
    const response = await apiClient.delete(`/users/my-list/${videoId}`);
    return response.data;
  },

  getWatchHistory: async () => {
    const response = await apiClient.get('/users/watch-history');
    return response.data;
  },

  updateWatchProgress: async (videoId, progress) => {
    const response = await apiClient.put(`/users/watch-history/${videoId}`, { progress });
    return response.data;
  },
};