import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";

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

  if (loading) return <p>Đang tải...</p>;

  if (!user) return <p>Không tìm thấy thông tin người dùng</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Thông tin cá nhân</h2>
      <p>
        <b>Tên:</b> {user.username}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}
