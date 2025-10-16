import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favorites from "../pages/Favorites";
import History from "../pages/History";
import MovieDetail from "../pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies/:slug", element: <MovieDetail /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/history", element: <History /> },
    ],
  },
]);

export default router;
