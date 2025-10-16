import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import VideoPlayer from "../components/VideoPlayer";
import MovieNotFoundImages from "../assets/movienotfoundimages.png";
export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await movieApi.getBySlug(slug);
        console.log("🎬 Dữ liệu phim chi tiết:", data);
        setMovie(data);
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

  return (
    <div className="max-w-5xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">
        {movie.title || movie.name}
      </h1>
      <img
        src={movie.poster_url || movie.thumb_url || { MovieNotFoundImages }}
        alt={movie.title || movie.name}
        className="w-60 rounded-lg mb-4 shadow-md"
      />
      <p className="text-gray-300 mb-6">
        {movie.description || "Không có mô tả."}
      </p>

      <VideoPlayer url={movie.videoUrl} />
    </div>
  );
}
