import { Link } from "react-router-dom";

export default function MovieSection({ title, slug, movies }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
        <Link
          to={`/countries/${slug}`}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition"
        >
          Xem toàn bộ →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie._id || movie.slug}
            to={`/movies/${movie.slug}`}
            className="bg-[#1E2028] rounded-lg overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <img
              src={movie.poster_url || movie.thumb_url}
              alt={movie.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-medium truncate">{movie.name}</h3>
              <p className="text-xs text-gray-400 truncate">
                {movie.origin_name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
