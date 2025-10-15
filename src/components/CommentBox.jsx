import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentBox({ movieId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!movieId) return;
    axios
      .get(`http://localhost:8080/api/movies/${movieId}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("❌ Lỗi lấy bình luận:", err));
  }, [movieId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axios.post(`http://localhost:8080/api/movies/${movieId}/comments`, {
        content: text,
      });
      setText("");
      const res = await axios.get(
        `http://localhost:8080/api/movies/${movieId}/comments`
      );
      setComments(res.data);
    } catch (err) {
      console.error("❌ Lỗi gửi bình luận:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mt-8">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400">
        Bình luận
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nhập bình luận..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 px-4 rounded-lg hover:bg-yellow-400 font-semibold"
        >
          Gửi
        </button>
      </form>

      <div>
        {comments.length === 0 ? (
          <p className="text-gray-400">Chưa có bình luận nào.</p>
        ) : (
          comments.map((c, i) => (
            <div
              key={i}
              className="border-t border-gray-700 py-2 text-gray-200"
            >
              <p className="font-semibold text-yellow-300">
                {c.user || "Người dùng ẩn danh"}
              </p>
              <p>{c.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
