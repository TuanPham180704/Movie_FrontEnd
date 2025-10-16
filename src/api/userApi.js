import axios from "axios";

const API_BASE = "http://localhost:8080";

export const userApi = {
  getProfile: async (token) => {
    const res = await axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  getFavorites: async (token) => {
    const res = await axios.get(`${API_BASE}/users/me/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  getHistory: async (token) => {
    const res = await axios.get(`${API_BASE}/users/me/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
