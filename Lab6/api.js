import axios from "axios";

const API_URL = "https://67b001a7dffcd88a67881973.mockapi.io"; // URL mẫu

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
