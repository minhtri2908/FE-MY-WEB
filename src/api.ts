import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL, // Lấy baseURL từ biến môi trường
});

export default api;
