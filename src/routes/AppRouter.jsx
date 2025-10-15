import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import Home from "../pages/Home.jsx";
import MovieDetail from "../pages/MovieDetail.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import History from "../pages/History.jsx";
import Favorites from "../pages/Favorites.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="movie/:slug" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
