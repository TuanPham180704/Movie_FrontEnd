import axios from "axios";

const API_BASE = "http://localhost:8080/api/movies";

export const movieApi = {
  getTrending: async () => {
    const res = await axios.get(`${API_BASE}/trending`);
    return Array.isArray(res.data)
      ? res.data
      : res.data.data || res.data.movies || [];
  },
  getById: async (id) => {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data?.movie || res.data || {};
  },

  getEpisodes: async (id) => {
    const res = await axios.get(`${API_BASE}/${id}/episodes`);
    return res.data?.episodes || [];
  },

  getComments: async (id) => {
    const res = await axios.get(`${API_BASE}/${id}/comments`);
    return res.data?.comments || [];
  },

  postComment: async (id, content) => {
    const res = await axios.post(`${API_BASE}/${id}/comments`, { content });
    return res.data;
  },
};
