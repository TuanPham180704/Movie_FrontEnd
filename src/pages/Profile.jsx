import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Không có token");
          return;
        }

        const data = await userApi.getProfile(token);
        setUser(data);
      } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e50914] border-t-transparent"></div>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-[70vh] bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <p className="text-gray-400 text-lg">
          Không tìm thấy thông tin người dùng
        </p>
      </div>
    );

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] p-6">
      <div className="bg-[#181818]/80 backdrop-blur-md rounded-3xl shadow-2xl border border-[#2a2a2a] p-8 max-w-lg w-full text-center transition-all hover:shadow-[#e50914]/30 hover:scale-[1.01]">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-[#65abd1] text-[110px] drop-shadow-[0_0_20px_rgba(229,9,20,0.4)]" />
          <h2 className="text-3xl font-semibold text-white mt-4 tracking-wide">
            {user.username}
          </h2>
        </div>

        <div className="text-left bg-[#121212] rounded-2xl p-5 shadow-inner border border-[#2a2a2a]">
          <p className="mb-3 text-gray-300">
            <span className="font-medium text-gray-100">👤 Họ tên:</span>{" "}
            {user.username}
          </p>
          <p className="mb-3 text-gray-300">
            <span className="font-medium text-gray-100">📧 Email:</span>{" "}
            {user.email}
          </p>
          {user.role && (
            <p className="text-gray-300">
              <span className="font-medium text-gray-100">🔖 Vai trò:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
          )}
        </div>

        <button
          className="mt-7 w-full py-3 rounded-xl bg-gradient-to-r from-[#9fbcdc] to-[#889ec1] text-white font-semibold shadow-lg hover:shadow-[#e50914]/40 hover:brightness-110 transition-all"
          onClick={() => alert("Chức năng chỉnh sửa sắp ra mắt 😄")}
        >
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
}
