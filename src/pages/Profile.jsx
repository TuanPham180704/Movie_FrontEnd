
import { useQuery } from "@tanstack/react-query";
import { getMe, getFavorites, getHistory } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Profile() {
  const navigate = useNavigate();
  const { data: me, isLoading: meLoading } = useQuery(["me"], getMe, {
    retry: false,
  });
  const { data: favorites } = useQuery(["favorites"], getFavorites, {
    enabled: !!me,
  });
  const { data: history } = useQuery(["history"], getHistory, {
    enabled: !!me,
  });

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  if (meLoading) return <p>Đang tải thông tin...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Thông tin tài khoản</h1>
      <div className="bg-gray-800 p-4 rounded mb-6">
        <p>
          <strong>Tên:</strong> {me?.username}
        </p>
        <p>
          <strong>Email:</strong> {me?.email}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 px-3 py-2 rounded"
        >
          Đăng xuất
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Yêu thích</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {favorites?.length ? (
          favorites.map((m) => (
            <div key={m.slug} className="bg-gray-800 p-2 rounded">
              <img src={m.thumb_url || m.poster_url} className="h-40 w-full object-cover rounded" />
              <p className="text-sm mt-2">{m.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Không có phim yêu thích.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2">Lịch sử xem</h2>
      <ul className="space-y-2">
        {history?.length ? (
          history.map((h) => (
            <li key={h.id} className="bg-gray-800 p-2 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{h.title || h.name}</p>
                  <p className="text-sm text-gray-400">{new Date(h.watched_at).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400">Chưa có lịch sử.</p>
        )}
      </ul>
    </div>
  );
}
