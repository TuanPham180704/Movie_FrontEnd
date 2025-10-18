import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../api/movieApi";
import VideoPlayer from "../components/VideoPlayer";

export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await movieApi.getDetail(slug);
        // API trả về ở dạng: { root: { status, movie, episodes } }
        const data = res.root;
        setMovie({
          ...data.movie,
          episodes: data.episodes,
        });
        // Chọn mặc định tập đầu tiên của server đầu tiên
        if (data.episodes?.[0]?.server_data?.[0]) {
          setSelectedEpisode(data.episodes[0].server_data[0]);
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [slug]);

  if (loading) return <p className="p-4">⏳ Đang tải dữ liệu...</p>;
  if (!movie) return <p className="p-4 text-red-500">Không tìm thấy phim.</p>;

  const servers = movie.episodes || [];
  const currentServer = servers[selectedServer];

  return (
    <div className="p-4 space-y-6">
      {/* --- Thông tin phim --- */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster_url}
          alt={movie.name}
          className="w-64 h-auto rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
          <p className="text-gray-500 mb-3">
            {movie.year} • {movie.country?.[0]?.name || "Đang cập nhật"}
          </p>
          <p className="mb-3 text-gray-700">{movie.content}</p>
          <p className="mb-3">
            <span className="font-semibold">Thể loại:</span>{" "}
            {movie.category.map((c) => c.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Diễn viên:</span>{" "}
            {movie.actor.join(", ")}
          </p>
        </div>
      </div>

      {/* --- Player --- */}
      {selectedEpisode && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            🎬 {selectedEpisode.name}
          </h2>
          <VideoPlayer url={selectedEpisode.link_m3u8} />
        </div>
      )}

      {/* --- Danh sách server --- */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🖥️ Chọn server</h3>
        <div className="flex gap-2 flex-wrap">
          {servers.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedServer(i);
                setSelectedEpisode(s.server_data[0]);
              }}
              className={`px-3 py-1 rounded-md border ${
                i === selectedServer
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {s.server_name}
            </button>
          ))}
        </div>
      </div>

      {/* --- Danh sách tập --- */}
      {currentServer && (
        <div>
          <h3 className="text-lg font-semibold mt-4 mb-2">📺 Chọn tập</h3>
          <div className="flex flex-wrap gap-2">
            {currentServer.server_data.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEpisode(ep)}
                className={`px-3 py-1 rounded-md border ${
                  selectedEpisode?.slug === ep.slug
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {ep.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
