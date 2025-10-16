// src/api/historyApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const addHistoryApi = async (movieId, episodeId = null) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.post(
      `${BASE_URL}/history`,
      { movie_id: movieId, episode_id: episodeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      }
    );
  } catch (err) {
    console.error("❌ Lỗi khi lưu lịch sử xem:", err);
  }
};

export const getHistoryApi = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const res = await axios.get(`${BASE_URL}/users/me/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });
    return res.data || [];
  } catch (err) {
    console.error("❌ Lỗi khi tải lịch sử:", err);
    return [];
  }
};
