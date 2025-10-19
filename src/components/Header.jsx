import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import SearchBox from "./SearchBox";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

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

  return (
    <header className="bg-[#1b1b1b] text-white shadow-md z-50 relative">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="leading-tight">
              <h1 className="text-xl font-semibold">🎬 DevChill</h1>
              <p className="text-xs text-gray-400">Phim hay cá rố</p>
            </div>
          </Link>

          <SearchBox />
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
          <DropdownMenuClick
            title="Thể loại"
            items={genres}
            basePath="/movies/genres"
          />
          <DropdownMenuClick
            title="Quốc gia"
            items={countries}
            basePath="/movies/countries"
          />
          <DropdownMenuClick
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

/* --- Dropdown chỉ mở khi click --- */
function DropdownMenuClick({ title, items, basePath }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`cursor-pointer hover:text-yellow-400 transition ${
          open ? "text-yellow-400" : ""
        }`}
      >
        {title}
      </button>

      {open && (
        <div className="absolute bg-gray-800 rounded shadow-lg mt-2 p-3 w-48 z-50 animate-fadeIn">
          {items && items.length > 0 ? (
            items.map((item) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                onClick={() => setOpen(false)}
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
