import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { Link } from "react-router-dom";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [newMovies, setNewMovies] = useState([]);
  const [chinaMovies, setChinaMovies] = useState([]);
  const [koreaMovies, setKoreaMovies] = useState([]);
  const [vietNamMovies, setVietNamMovies] = useState([]);
  const [cartoonMovies, setCartoonMovies] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [newData, chinaData, koreaData, vnData, cartoonData] =
          await Promise.all([
            movieApi.getNew(1, "v3"),
            movieApi.getCountryDetail("trung-quoc", 1),
            movieApi.getCountryDetail("han-quoc", 1),
            movieApi.getCountryDetail("viet-nam", 1),
            movieApi.getGenreDetail("tre-em", 1),
          ]);

        const limit = 10;
        const safeSlice = (data) =>
          data?.items?.slice(0, limit) ||
          data?.data?.items?.slice(0, limit) ||
          [];

        setNewMovies(safeSlice(newData));
        setChinaMovies(safeSlice(chinaData));
        setKoreaMovies(safeSlice(koreaData));
        setVietNamMovies(safeSlice(vnData));
        setCartoonMovies(safeSlice(cartoonData));
      } catch (error) {
        console.error("Lỗi khi load phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const sections = [
    { title: "Phim mới cập nhật", data: newMovies },
    { title: "Phim Trung Quốc", data: chinaMovies },
    { title: "Phim Hàn Quốc", data: koreaMovies },
    { title: "Phim Việt Nam", data: vietNamMovies },
    { title: "Phim Trẻ Em", data: cartoonMovies },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="relative h-[320px] md:h-[400px] bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center text-center rounded-b-3xl shadow-lg">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Chào mừng đến với{" "}
            <span className="text-yellow-300">🎬DevChill</span>
          </h1>
          <p className="text-lg text-gray-200">
            Nơi thư giãn của dân lập trình — xem phim, chill nhạc, recharge năng
            lượng để code tiếp 🔥
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {sections.map((section, idx) => (
          <section key={idx}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
                {section.title}
              </h2>

              {/* Dựa vào title để xác định route */}
              <Link
                to={
                  section.title.includes("Trung Quốc")
                    ? "/movies/country/trung-quoc"
                    : section.title.includes("Hàn Quốc")
                    ? "/movies/country/han-quoc"
                    : section.title.includes("Việt Nam")
                    ? "/movies/country/viet-nam"
                    : section.title.includes("Trẻ Em")
                    ? "/movies/genre/tre-em"
                    : "/movies/new?page=1&version=v3"
                }
                className="text-sm text-gray-400 hover:text-red-400 transition"
              >
                Xem thêm →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
              {loading ? (
                Array(10)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              ) : section.data.length > 0 ? (
                section.data.map((movie) => (
                  <MovieCard key={movie._id || movie.slug} movie={movie} />
                ))
              ) : (
                <p className="text-gray-400 text-center col-span-full">
                  Không có phim nào để hiển thị.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
