export const setToken = (token) => {
  if (token) localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const removeToken = () => localStorage.removeItem("token");

export const logout = () => {
  removeToken();
  try {
    localStorage.removeItem("me");
  } catch (e) {}
};
