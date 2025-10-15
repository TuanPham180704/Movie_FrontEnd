// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(registerApi, {
    onSuccess() {
      alert("Đăng ký thành công. Vui lòng đăng nhập.");
      navigate("/login");
    },
    onError(err) {
      alert(err?.response?.data?.error || "Register failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Đăng ký</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Tên hiển thị"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-2 bg-yellow-500 rounded font-semibold"
          >
            {mutation.isLoading ? "Đang gửi..." : "Đăng ký"}
          </button>

          <p className="text-sm text-gray-400 text-center">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-yellow-400 underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
