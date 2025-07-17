import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ ensures cookies/sessions are sent on every request
});

// 🧠 AUTH SERVICE
export const authService = {
  login: async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data; // 🔁 Expecting { user, token }
  },

  register: async (data) => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Failed to parse stored user:', err.message);
      return null;
    }
  },
};