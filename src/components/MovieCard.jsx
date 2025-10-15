export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-800 rounded-lg p-2 hover:scale-105 transition">
      <img
        src={movie.thumb_url || movie.poster_url}
        alt={movie.name}
        className="w-full h-60 object-cover rounded-lg"
      />
      <h2 className="text-sm font-semibold mt-2 text-center">{movie.name}</h2>
    </div>
  );
}
