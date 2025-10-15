import axios from "axios";

const API_BASE = "http://localhost:8080/api/movies";

export const movieApi = {
  getTrending: async () => {
    const res = await axios.get(`${API_BASE}/trending`);
    return Array.isArray(res.data)
      ? res.data
      : res.data.data || res.data.movies || [];
  },
};
