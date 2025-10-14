import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies/trending")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.movies || [];
        console.log("Phim nhận được:", data);
        console.log(movie.thumb_url, movie.poster_url);

        setMovies(data);
      })
      .catch((err) => console.error("Lỗi lấy phim:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 Danh sách phim mới cập nhật
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.slug}
            className="bg-gray-800 rounded-lg p-2 hover:scale-105 transition"
          >
            <img
              src={movie.thumb_url || movie.poster_url}
              alt={movie.name}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h2 className="text-sm font-semibold mt-2 text-center">
              {movie.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
