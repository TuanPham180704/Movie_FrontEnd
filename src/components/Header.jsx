import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  // 🔹 Lấy dữ liệu thể loại & quốc gia từ backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genreRes, countryRes] = await Promise.all([
          axios.get("http://localhost:8080/api/movies/genres"),
          axios.get("http://localhost:8080/api/movies/countries"),
        ]);
        setGenres(genreRes.data || []);
        setCountries(countryRes.data || []);
      } catch (err) {
        console.error("Lỗi khi tải thể loại / quốc gia:", err);
      }
    };
    fetchData();
  }, []);

  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="bg-[#1b1b1b] text-white shadow-md z-50 relative">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3">
        {/* 🔸 Logo + Thanh tìm kiếm */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="leading-tight">
              <h1 className="text-xl font-semibold">🎬 DevChill</h1>
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
              placeholder="Tìm kiếm phim, diễn viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
            />
          </form>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-sm flex-grow justify-center relative">
          <Link to="/movies/list/phim-le" className="hover:text-yellow-400">
            Phim Lẻ
          </Link>
          <Link to="/movies/list/phim-bo" className="hover:text-yellow-400">
            Phim Bộ
          </Link>
          <Link to="/movies/list/hoat-hinh" className="hover:text-yellow-400">
            Hoạt Hình
          </Link>
          <DropdownMenu
            title="Thể loại"
            items={genres}
            basePath="/movies/genres"
          />
          <DropdownMenu
            title="Quốc gia"
            items={countries}
            basePath="/movies/countries"
          />
          <DropdownMenu
            title="Năm"
            items={years.map((y) => ({ name: y, slug: y }))}
            basePath="/movies/years"
          />
        </nav>
        <div className="flex items-center gap-4 flex-shrink-0">
          {token ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm hover:bg-gray-600 transition"
              >
                <FaUser className="mr-2" />
                Thông tin cá nhân
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

function DropdownMenu({ title, items, basePath }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="cursor-pointer hover:text-yellow-400">{title}</span>

      {open && (
        <div className="absolute bg-gray-800 rounded shadow-lg mt-2 p-3 w-48 z-50 animate-fadeIn">
          {items && items.length > 0 ? (
            items.map((item) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                className="block py-1 px-2 text-sm hover:text-yellow-400 hover:bg-gray-700 rounded transition"
              >
                {item.name}
              </Link>
            ))
          ) : (
            <span className="text-gray-400 text-sm">Đang tải...</span>
          )}
        </div>
      )}
    </div>
  );
}
