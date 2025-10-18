import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [newMovies, setNewMovies] = useState([]);
  const [chinaMovies, setChinaMovies] = useState([]);
  const [koreaMovies, setKoreaMovies] = useState([]);
  const [vietNamMovies, setVietNamMovies] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [newData, chinaData, koreaData, vnData] = await Promise.all([
          movieApi.getNew(1, "v3"),
          movieApi.getCountryDetail("trung-quoc", 1),
          movieApi.getCountryDetail("han-quoc", 1),
          movieApi.getCountryDetail("viet-nam", 1),
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
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {sections.map((section, idx) => (
          <section key={idx}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
                {section.title}
              </h2>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-red-400 transition"
              >
                Xem thêm →
              </a>
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
