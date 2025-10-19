import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { movieApi } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

export default function MovieList() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || "1");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(1);

  // --- Load danh sách phim ---
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let data;
        if (location.pathname.includes("/movies/genres/")) {
          data = await movieApi.getGenreDetail(slug, page);
        } else if (location.pathname.includes("/movies/countries/")) {
          data = await movieApi.getCountryDetail(slug, page);
        } else if (location.pathname.includes("/movies/years/")) {
          data = await movieApi.getMoviesByYear(slug, page);
        } else if (location.pathname.includes("/movies/list/phim-bo")) {
          data = await movieApi.getList("phim-bo", page);
        } else if (location.pathname.includes("/movies/list/phim-le")) {
          data = await movieApi.getList("phim-le", page);
        } else if (location.pathname.includes("/movies/list/hoat-hinh")) {
          data = await movieApi.getList("hoat-hinh", page);
        } else {
          data = await movieApi.getNew(page);
        }
        const items = data?.items || data?.data?.items || [];
        const total =
          data?.pagination?.totalPages ||
          data?.data?.params?.pagination?.totalPages ||
          1;

        setMovies(items);
        setTotalPages(total);
      } catch (error) {
        console.error("Lỗi tải phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [slug, page, location.pathname]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [page]);
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => {
      const start = Math.max(1, page - 2);
      return start + i <= totalPages ? start + i : totalPages - 4 + i;
    }
  ).filter((p) => p > 0 && p <= totalPages);

  return (
    <div className="bg-gray-950 text-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {slug ? slug.replaceAll("-", " ") : "Danh sách phim"}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
          {loading
            ? Array(10)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => (
                <MovieCard key={movie._id || movie.slug} movie={movie} />
              ))}
        </div>
        <div className="flex justify-center mt-10 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            ← Trước
          </button>

          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-2 rounded ${
                num === page
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Sau →
          </button>
        </div>

        <div className="text-center text-gray-400 mt-4">
          Trang {page} / {totalPages}
        </div>
      </div>
    </div>
  );
}
