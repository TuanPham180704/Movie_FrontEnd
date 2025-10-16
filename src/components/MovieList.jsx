import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import ReactPlayer from "react-player";

export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await movieApi.getBySlug(slug);
        setMovie(data);
      } catch (err) {
        console.error("❌ Lỗi tải phim:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">⏳ Đang tải phim...</p>
    );
  if (!movie)
    return (
      <p className="text-center mt-10 text-gray-400">Không tìm thấy phim.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">
        {movie.title || movie.name}
      </h1>
      <img
        src={movie.poster_url || movie.thumb_url || "/placeholder.jpg"}
        alt={movie.title || movie.name}
        className="w-60 rounded-lg mb-4 shadow-md"
      />
      <p className="text-gray-300 mb-6">
        {movie.description || "Không có mô tả."}
      </p>

      {movie.videoUrl ? (
        <ReactPlayer
          url={movie.videoUrl}
          controls
          width="100%"
          height="480px"
          className="rounded-lg overflow-hidden mb-8"
        />
      ) : (
        <p className="text-red-400">Không tìm thấy video cho phim này.</p>
      )}
    </div>
  );
}
