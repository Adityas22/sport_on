import axios from "axios";

// Ambil URL dari environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

// Buat axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Interceptor untuk menambahkan token ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
