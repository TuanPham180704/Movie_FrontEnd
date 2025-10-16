import axios from "axios";

const API_BASE = "http://localhost:8080/api/movies";

export const movieApi = {
  getAll: async (page = 1) => {
    const res = await axios.get(`${API_BASE}?page=${page}`);
    return res.data.movies || [];
  },


  getBySlug: async (slug) => {
    const res = await axios.get(`${API_BASE}/${slug}`);
    return res.data;
  },

  getVideoByEpisode: async (slug, episode = 1) => {
    const res = await axios.get(`${API_BASE}/${slug}/video?episode=${episode}`);
    return res.data.videoUrl;
  },
};
