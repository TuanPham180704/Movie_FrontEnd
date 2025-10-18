import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import VideoPlayer from "../components/VideoPlayer";

export default function MovieDetail() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await movieApi.getDetail(slug);

        const movieData = res.movie;
        const eps = res.episodes || [];

        setMovie(movieData);
        setEpisodes(eps);

        // Lấy URL mặc định từ server đầu tiên, tập đầu tiên
        const defaultUrl = eps?.[0]?.server_data?.[0]?.link_m3u8 || "";
        setVideoUrl(defaultUrl);
      } catch (error) {
        console.error("Lỗi khi load chi tiết phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const handleServerChange = (index) => {
    setCurrentServerIndex(index);
    setCurrentEpisodeIndex(0);
    const url = episodes?.[index]?.server_data?.[0]?.link_m3u8 || "";
    setVideoUrl(url);
  };

  const handleEpisodeChange = (index) => {
    setCurrentEpisodeIndex(index);
    const url =
      episodes?.[currentServerIndex]?.server_data?.[index]?.link_m3u8 || "";
    setVideoUrl(url);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Đang tải phim...
      </div>
    );

  if (!movie)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Không tìm thấy thông tin phim.
      </div>
    );

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
        <p className="text-gray-400 mb-6">
          {movie.origin_name} • {movie.year} • {movie.lang} • {movie.quality}
        </p>

        {videoUrl ? (
          <VideoPlayer url={videoUrl} />
        ) : (
          <div className="bg-gray-800 text-center py-10 rounded-lg">
            <p>Chưa có video để phát.</p>
          </div>
        )}

        {episodes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Chọn Server:</h3>
            <div className="flex flex-wrap gap-2">
              {episodes.map((sv, idx) => (
                <button
                  key={idx}
                  onClick={() => handleServerChange(idx)}
                  className={`px-4 py-2 rounded-md ${
                    currentServerIndex === idx
                      ? "bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {sv.server_name}
                </button>
              ))}
            </div>
          </div>
        )}
        {episodes[currentServerIndex]?.server_data?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Danh sách tập ({movie.episode_total || "?"}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {episodes[currentServerIndex].server_data.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEpisodeChange(idx)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    currentEpisodeIndex === idx
                      ? "bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {ep.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mô tả phim */}
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <img
              src={movie.poster_url}
              alt={movie.name}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xl font-bold">Nội dung phim</h2>
            <p className="text-gray-300 leading-relaxed">{movie.content}</p>

            <div className="mt-4 text-gray-400 text-sm">
              <p>
                <strong>Đạo diễn:</strong>{" "}
                {movie.director?.join(", ") || "Đang cập nhật"}
              </p>
              <p>
                <strong>Diễn viên:</strong>{" "}
                {movie.actor?.join(", ") || "Đang cập nhật"}
              </p>
              <p>
                <strong>Thời lượng:</strong> {movie.time}
              </p>
              <p>
                <strong>Trạng thái:</strong> {movie.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
