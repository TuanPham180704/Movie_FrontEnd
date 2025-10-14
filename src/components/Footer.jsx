import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-10 border-t border-gray-800">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} TuanDanny Movie</p>
        <p className="mt-2">
          <Link to="/" className="hover:text-red-400">
            Trang chủ
          </Link>{" "}
          ·{" "}
          <Link to="/favorites" className="hover:text-red-400">
            Yêu thích
          </Link>{" "}
          ·{" "}
          <Link to="/history" className="hover:text-red-400">
            Lịch sử
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
