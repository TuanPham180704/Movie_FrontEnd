import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import VideoPlayer from "../components/VideoPlayer";
import MovieNotFoundImages from "../assets/movienotfoundimages.png";

export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await movieApi.getMovieDetail(slug);
        const movieData = data.movie || data;
        setMovie(movieData);

        // Chọn tập mặc định
        if (movieData.episodes && movieData.episodes.length > 0) {
          const firstServer = movieData.episodes[0];
          if (firstServer.server_data && firstServer.server_data.length > 0) {
            setCurrentEpisode(firstServer.server_data[0]);
          }
        }
      } catch (err) {
        console.error("❌ Lỗi tải phim:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Đang tải phim...</p>;
  if (!movie) return <p className="text-center mt-10">Không tìm thấy phim.</p>;
  const videoUrl =
    (currentEpisode && currentEpisode.link_m3u8) || movie.trailer_url || null;

  return (
    <div className="max-w-5xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">
        {movie.title || movie.name}
      </h1>

      <img
        src={movie.poster_url || movie.thumb_url || MovieNotFoundImages}
        alt={movie.title || movie.name}
        className="w-60 rounded-lg mb-4 shadow-md"
      />

      <p className="text-gray-300 mb-6">
        {movie.content || movie.description || "Không có mô tả."}
      </p>

      {videoUrl ? (
        <VideoPlayer url={videoUrl} />
      ) : (
        <p className="text-center text-red-400">Video chưa có.</p>
      )}

      {/* Hiển thị danh sách tập nếu có */}
      {movie.episodes && movie.episodes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Danh sách tập:</h2>
          <ul className="flex flex-wrap gap-2">
            {movie.episodes[0].server_data.map((ep) => (
              <li
                key={ep.slug}
                className={`px-2 py-1 border rounded cursor-pointer ${
                  currentEpisode?.slug === ep.slug
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700"
                }`}
                onClick={() => setCurrentEpisode(ep)}
              >
                {ep.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
