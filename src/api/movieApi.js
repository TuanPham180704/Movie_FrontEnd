import axios from "axios";

const API_BASE = "http://localhost:8080/api/movies";

export const movieApi = {
  async getTrending() {
    try {
      const res = await axios.get(API_BASE);
      return Array.isArray(res.data) ? res.data : res.data.movies || [];
    } catch (err) {
      console.error("❌ Lỗi API getTrending:", err);
      return [];
    }
  },

  getAll: async (page = 1) => {
    try {
      const res = await axios.get(`${API_BASE}?page=${page}`);
      console.log("📦 Kết quả getAll:", res.data);
      return Array.isArray(res.data) ? res.data : res.data.movies || [];
    } catch (err) {
      console.error("❌ Lỗi API getAll:", err);
      return [];
    }
  },

  getBySlug: async (slug) => {
    try {
      const res = await axios.get(`${API_BASE}/${slug}`);
      console.log("📦 Kết quả getBySlug:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Lỗi API getBySlug:", err);
      return null;
    }
  },

  getVideoByEpisode: async (slug, episode = 1) => {
    try {
      const res = await axios.get(
        `${API_BASE}/${slug}/video?episode=${episode}`
      );
      return res.data.videoUrl;
    } catch (err) {
      console.error("❌ Lỗi API getVideoByEpisode:", err);
      return null;
    }
  },
};
