import { useEffect, useState } from "react";
import { getHistoryApi, addHistoryApi } from "../api/historyApi";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const loadHistory = async () => {
    try {
      const data = await getHistoryApi();
      setHistory(data);
    } catch (err) {
      console.error("❌ Lỗi tải lịch sử:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);
  const handleClickMovie = async (movieId) => {
    setCurrentMovieId(movieId);
    await addHistoryApi(movieId);
    const updatedHistory = await getHistoryApi();
    setHistory(updatedHistory);
  };

  if (loading) return <p className="text-center mt-10">Đang tải lịch sử...</p>;

  if (history.length === 0)
    return (
      <div className="text-center mt-10 text-gray-300">
        <p>Bạn chưa xem phim nào gần đây.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">
        🎬 Lịch sử xem phim
      </h1>
      {currentMovieId && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            🎬 Đang xem phim #{currentMovieId}
          </h2>
          <video
            src={`http://localhost:8080/movies/${currentMovieId}/stream?t=${Date.now()}`}
            controls
            autoPlay
            className="w-full rounded-lg"
          />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClickMovie(item.movie_id)}
            className="cursor-pointer bg-gray-800 p-2 rounded-lg hover:scale-105 hover:bg-gray-700 transition-transform"
          >
            <img
              src={item.thumb_url || "/placeholder.jpg"}
              alt={item.title}
              className="rounded-lg w-full h-56 object-cover mb-2"
            />
            <h2 className="text-sm font-semibold text-center truncate">
              {item.title}
            </h2>
            <p className="text-xs text-gray-400 text-center">
              Xem lúc: {new Date(item.watched_at).toLocaleString("vi-VN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
