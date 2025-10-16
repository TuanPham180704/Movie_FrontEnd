import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await movieApi.getAll();
        setMovies(data);
      } catch (err) {
        console.error("❌ Lỗi tải phim:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []); // chỉ chạy 1 lần

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">⏳ Đang tải phim...</p>
    );

  if (movies.length === 0)
    return (
      <p className="text-center mt-10 text-gray-400">😢 Không có phim nào.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">
        🎬 Phim mới cập nhật
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </div>
    </div>
  );
}
