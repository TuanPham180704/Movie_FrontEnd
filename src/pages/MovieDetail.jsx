import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import CommentBox from "../components/CommentBox.jsx";

export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/movies/${slug}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Lỗi lấy chi tiết phim:", err));
  }, [slug]);

  if (!movie) return <p className="text-center mt-10">Đang tải phim...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
      <img
        src={movie.poster_url}
        alt={movie.name}
        className="w-60 rounded-lg mb-4"
      />
      <p className="text-gray-300 mb-6">
        {movie.description || "Không có mô tả."}
      </p>

      <ReactPlayer
        url={
          movie.video_url ||
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
        controls
        width="100%"
        height="480px"
        className="rounded-lg overflow-hidden"
      />

      <CommentBox />
    </div>
  );
}
