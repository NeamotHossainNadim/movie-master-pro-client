import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import MyCollection from "../pages/MyCollection";
import AddMovie from "../pages/AddMovie";
import UpdateMovie from "../pages/UpdateMovie";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Watchlist from "../pages/Watchlist"; 
import NotFound from "../pages/NotFound";   
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "movies/:id", element: <MovieDetails /> },
      {
        path: "movies/add",
        element: (
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        ),
      },
      {
        path: "movies/update/:id",
        element: (
          <ProtectedRoute>
            <UpdateMovie />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-collection",
        element: (
          <ProtectedRoute>
            <MyCollection />
          </ProtectedRoute>
        ),
      },
      {
        path: "watchlist",
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> }, 
    ],
  },
]);

export default router;
