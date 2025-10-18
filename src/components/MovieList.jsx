import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

export default function MovieList() {
  const { type, slug } = useParams(); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let data;

        if (type === "country") {
          data = await movieApi.getCountryDetail(slug, page);
        } else if (type === "category") {
          data = await movieApi.getCategoryDetail(slug, page);
        } else {
          data = await movieApi.getNew(page);
        }

        const list = data?.items || data?.data?.items || [];

        setMovies(list);
        setTotalPages(data?.pagination?.totalPages || 5);
      } catch (err) {
        console.error("Lỗi khi tải danh sách phim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type, slug, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-red-500 pl-3">
          {type === "country"
            ? `Phim ${slug.replace("-", " ")}`
            : type === "category"
            ? `Thể loại: ${slug.replace("-", " ")}`
            : "Tất cả phim"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
          {loading ? (
            Array(30)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie._id || movie.slug} movie={movie} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              Không có phim nào để hiển thị.
            </p>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-red-600 disabled:opacity-50"
            >
              ← Trước
            </button>

            <span className="text-gray-300">
              Trang {page}/{totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
