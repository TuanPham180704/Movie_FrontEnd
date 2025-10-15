// src/components/Header.jsx (update)
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          🎬DannyPhim
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hidden md:inline">
            Trang chủ
          </Link>

          {token ? (
            <>
              <Link to="/profile" className="hover:text-yellow-400">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400">
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 px-3 py-1 rounded text-black"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
