import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import CommentBox from "../components/CommentBox.jsx";

export default function MovieDetail() {
  const { slug } = useParams(); // slug hoặc id phim
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/movies/${slug}`);
        setMovie(res.data);
      } catch (err) {
        console.error("❌ Lỗi lấy chi tiết phim:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Đang tải phim...</p>;
  if (!movie) return <p className="text-center mt-10">Không tìm thấy phim.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">{movie.name}</h1>
      <img
        src={movie.poster_url || "/placeholder.jpg"}
        alt={movie.name}
        className="w-60 rounded-lg mb-4 shadow-md"
      />
      <p className="text-gray-300 mb-6">
        {movie.description || "Không có mô tả."}
      </p>
      <ReactPlayer
        url={
          movie.videoUrl ||
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
        controls
        width="100%"
        height="480px"
        className="rounded-lg overflow-hidden mb-8"
      />
      <CommentBox movieId={movie.id} />
    </div>
  );
}
