// src/api/userApi.js
import axios from "./axios";

export const getMe = async () => {
  const res = await axios.get("/users/me");
  return res.data;
};

export const getFavorites = async () => {
  const res = await axios.get("/users/me/favorites");
  return res.data;
};

export const getHistory = async () => {
  const res = await axios.get("/users/me/history");
  return res.data;
};
