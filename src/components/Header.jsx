import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search?keyword=${keyword}`);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500">
          Rophim<span className="text-white">.mx</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-red-400">Trang chủ</Link>
          <Link to="/favorites" className="hover:text-red-400">Yêu thích</Link>
          <Link to="/history" className="hover:text-red-400">Lịch sử</Link>
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="bg-gray-800 text-sm px-3 py-2 rounded-l-md focus:outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 px-4 py-2 rounded-r-md hover:bg-red-700"
          >
            Tìm
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
