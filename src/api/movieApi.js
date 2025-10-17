// src/api/movieApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/movies",
  timeout: 10000, 
});

// Interceptor xử lý lỗi chung
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const movieApi = {
  getNewMovies: () => api.get(`/new`),

  getMovieDetail: (slug) => api.get(`/${slug}`),

  getTmdb: (type, id) => api.get(`/tmdb/${type}/${id}`),

  getList: (category, page = 1, limit = 10) =>
    api.get(`/list/${category}?page=${page}&limit=${limit}`),

  searchMovie: (keyword, page = 1) =>
    api.get(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}`),

  getGenres: () => api.get(`/genres`),

  getGenreDetail: (genre, page = 1) => api.get(`/genres/${genre}?page=${page}`),

  getCountries: () => api.get(`/countries`),

  getCountryDetail: (country, page = 1) =>
    api.get(`/countries/${country}?page=${page}`),

  getMoviesByYear: (year, page = 1) => api.get(`/years/${year}?page=${page}`),
};
