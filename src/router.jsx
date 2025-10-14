import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import History from "./pages/History";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/movies/:slug", element: <MovieDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/history", element: <History /> },
];

export default routes;
