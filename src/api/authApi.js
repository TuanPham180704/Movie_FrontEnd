import axios from "axios";

const API_URL = "http://localhost:8080";

export const loginApi = async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const registerApi = async ({ username, email, password }) => {
  const res = await axios.post(`${API_URL}/auth/register`, {
    username,
    email,
    password,
  });
  return res.data;
};
