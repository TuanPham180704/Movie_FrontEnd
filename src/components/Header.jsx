import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 py-4 shadow-md ">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-yellow-400">
          🎬 Rophim Clone
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-yellow-400">Trang chủ</Link>
          <Link to="/favorites" className="hover:text-yellow-400">Yêu thích</Link>
          <Link to="/history" className="hover:text-yellow-400">Lịch sử</Link>
          <Link to="/login" className="hover:text-yellow-400">Đăng nhập</Link>
        </nav>
      </div>
    </header>
  );
}
