import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api", 
  baseURL: "https://personal-finance-dashboard-backend.onrender.com/api", 
});

// Automatically attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
