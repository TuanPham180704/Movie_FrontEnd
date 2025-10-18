import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-105 transition block"
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-2">
        <h3 className="font-semibold text-sm line-clamp-2">{movie.title}</h3>
        <p className="text-xs text-gray-500">{movie.year}</p>
      </div>
    </Link>
  );
}
