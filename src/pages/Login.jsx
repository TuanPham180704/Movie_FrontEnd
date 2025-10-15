
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";
import { setToken } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const qc = useQueryClient();

  const mutation = useMutation(loginApi, {
    onSuccess(data) {
      if (data?.token) {
        setToken(data.token);
        qc.invalidateQueries(["me"]);
        navigate("/", { replace: true });
      } else {
        alert("Login failed: no token returned");
      }
    },
    onError(err) {
      console.error(err);
      alert(err?.response?.data?.error || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Đăng nhập</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {mutation.isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-sm text-gray-400 text-center">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-yellow-400 underline">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
