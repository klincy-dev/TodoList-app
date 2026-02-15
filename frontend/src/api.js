import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://todolist-app-2-yrxj.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
