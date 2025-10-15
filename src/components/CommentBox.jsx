import { useState } from "react";

export default function CommentBox() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    setComments([...comments, input]);
    setInput("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Bình luận</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập bình luận..."
          className="flex-1 p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleAdd}
          className="bg-yellow-500 px-4 rounded text-black font-semibold"
        >
          Gửi
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {comments.map((c, i) => (
          <li
            key={i}
            className="bg-gray-800 rounded p-2 text-sm border-l-4 border-yellow-500"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
