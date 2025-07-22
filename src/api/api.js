import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-backend-production-abe1.up.railway.app",
  withCredentials: true,
});

export default api;
