// src/api/authApi.js
import axios from "./axios";

export const registerApi = async ({ username, email, password }) => {
  const res = await axios.post("/auth/register", { username, email, password });
  return res.data;
};

export const loginApi = async ({ email, password }) => {
  const res = await axios.post("/auth/login", { email, password });
  // expect { token: '...' }
  return res.data;
};
