import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.slug}`}
      className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform block"
    >
      <img
        src={movie.thumb_url || movie.poster_url}
        alt={movie.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-3 text-center">
        <h2 className="text-sm font-semibold line-clamp-2">{movie.name}</h2>
      </div>
    </Link>
  );
}
