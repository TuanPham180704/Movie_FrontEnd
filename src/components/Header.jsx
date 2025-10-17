import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useState } from "react";
import { FaSearch, FaUser, FaDesktop } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?query=${encodeURIComponent(search)}`);
  };

  return (
    <header className="bg-[#1b1b1b] text-white shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6 px-6 py-2">
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="leading-tight">
              <h1 className="text-xl font-semibold">🎬DevChill</h1>
              <p className="text-xs text-gray-400">Phim hay cá rố</p>
            </div>
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#2a2a2a] rounded-lg px-3 py-[6px] w-[320px]"
          >
            <FaSearch className="text-gray-400 mr-2 text-sm" />
            <input
              type="text"
              placeholder="Tìm kiếm phim, diễn viên"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
            />
          </form>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-sm flex-grow justify-center">
          <Link to="/phim-le" className="hover:text-yellow-400">
            Phim Lẻ
          </Link>
          <Link to="/phim-bo" className="hover:text-yellow-400">
            Phim Bộ
          </Link>
          <Link to="/hoat-hinh" className="hover:text-yellow-400">
            Hoạt Hình
          </Link>
          <Link to="/the-loai" className="hover:text-yellow-400">
            Thể loại
          </Link>
          <Link to="/quoc-gia" className="hover:text-yellow-400">
            Quốc gia
          </Link>
          <Link to="/nam" className="hover:text-yellow-400">
            Năm
          </Link>
        </nav>
        <div className="flex items-center gap-4 flex-shrink-0">
          {token ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm hover:bg-gray-600 transition"
              >
                <FaUser className="mr-2" />
                Thông Tin Cá Nhân
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-sm px-3 py-1 rounded hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm hover:bg-gray-600 transition"
            >
              <FaUser className="mr-2" />
              Thành viên
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
