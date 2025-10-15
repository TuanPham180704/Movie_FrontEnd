export default function EpisodeList({ episodes }) {
  if (!episodes.length)
    return <p className="text-gray-400">Chưa có tập phim nào.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {episodes.map((ep) => (
        <div
          key={ep.id}
          className="bg-gray-800 rounded-xl p-3 hover:bg-gray-700 transition cursor-pointer"
        >
          <h3 className="font-semibold">{ep.title}</h3>
          {ep.url && (
            <iframe
              src={ep.url}
              className="w-full h-40 mt-2 rounded-md"
              allowFullScreen
            ></iframe>
          )}
        </div>
      ))}
    </div>
  );
}
