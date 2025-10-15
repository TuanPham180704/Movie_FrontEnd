import { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi";

export default function CommentSection({ movieId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await movieApi.getComments(movieId);
      setComments(data);
    };
    load();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await movieApi.postComment(movieId, text);
    setText("");
    const updated = await movieApi.getComments(movieId);
    setComments(updated);
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 bg-gray-800 text-white p-2 rounded-xl outline-none"
          placeholder="Viết bình luận..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-600 px-4 rounded-xl hover:bg-blue-500">
          Gửi
        </button>
      </form>

      {comments.map((c, i) => (
        <div
          key={i}
          className="bg-gray-800 p-3 rounded-xl mb-2 border border-gray-700"
        >
          <p className="font-semibold">{c.user || "Ẩn danh"}</p>
          <p className="text-gray-300">{c.content}</p>
        </div>
      ))}
    </div>
  );
}
