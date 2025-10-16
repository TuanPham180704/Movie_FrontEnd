import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.slug}`}
      className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform block shadow-lg"
    >
      <img
        src={movie.thumb_url || movie.poster_url || "/placeholder.jpg"}
        alt={movie.name || movie.title}
        className="w-full h-64 sm:h-72 md:h-56 lg:h-64 object-cover"
      />
      <div className="p-3 text-center bg-gray-900">
        <h2 className="text-sm sm:text-base font-semibold text-white line-clamp-2">
          {movie.name || movie.title || "Không tên"}
        </h2>
      </div>
    </Link>
  );
}
