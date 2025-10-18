import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import VideoPlayer from "../components/VideoPlayer";
import MovieCard from "../components/MovieCard";

export default function MovieDetail() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await movieApi.getDetail(slug);
        setMovie(res?.movie || res?.data || res);
        // Lấy phim liên quan (cùng thể loại đầu tiên)
        const genreSlug = res?.movie?.category?.[0]?.slug;
        if (genreSlug) {
          const relatedRes = await movieApi.getGenreDetail(genreSlug, 1);
          setRelated(
            relatedRes?.items?.filter((m) => m.slug !== slug)?.slice(0, 10) ||
              []
          );
        }
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Đang tải dữ liệu phim...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Không tìm thấy phim.</p>
      </div>
    );

  const videoUrl =
    movie?.episodes?.[0]?.server_data?.[0]?.link_m3u8 || movie?.link_m3u8;

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* --- Video Player --- */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              {videoUrl ? (
                <VideoPlayer url={videoUrl} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Không có video để phát.
                </div>
              )}
            </div>
          </div>

          {/* --- Movie Info --- */}
          <div className="w-full lg:w-1/3 space-y-4">
            <h1 className="text-3xl font-bold text-red-500">{movie.name}</h1>
            {movie.origin_name && (
              <p className="text-gray-400 italic">{movie.origin_name}</p>
            )}

            <div className="space-y-2 text-sm text-gray-300">
              {movie.year && <p>Năm phát hành: {movie.year}</p>}
              {movie.time && <p>Thời lượng: {movie.time}</p>}
              {movie.country && movie.country.length > 0 && (
                <p>Quốc gia: {movie.country.map((c) => c.name).join(", ")}</p>
              )}
              {movie.category && movie.category.length > 0 && (
                <p>Thể loại: {movie.category.map((c) => c.name).join(", ")}</p>
              )}
            </div>

            {movie.content && (
              <div className="text-gray-300 text-sm leading-relaxed max-h-60 overflow-y-auto border-t border-gray-800 pt-3">
                <p>{movie.content}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Related Movies --- */}
        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
              Phim liên quan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
              {related.map((m) => (
                <MovieCard key={m._id || m.slug} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
