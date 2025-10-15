// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favorites from "../pages/Favorites";
import History from "../pages/History";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
