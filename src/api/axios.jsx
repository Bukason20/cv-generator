import axios from "axios";

const BASE_URL = "https://cert-app-flask.onrender.com";

// Public API instance (no auth header needed)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Protected API instance (adds token automatically)
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach token to every request on authApi
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or from a secure store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
