import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieApi.getAll();
        // ✅ API trả { page, total, movies } nên ta lấy data.movies
        setMovies(data.movies || []);
      } catch (err) {
        console.error("❌ Lỗi khi tải phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10">⏳ Đang tải phim...</div>
    );
  }

  if (!movies.length) {
    return (
      <div className="text-center text-gray-400 mt-10">
        😢 Không có phim nào để hiển thị.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 Phim mới cập nhật
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieList key={movie.slug} movie={movie} />
        ))}
      </div>
    </div>
  );
}
