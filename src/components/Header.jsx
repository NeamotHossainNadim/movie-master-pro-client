import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MovieMaster Pro</Link>
        <nav className="space-x-6">
          <Link to="/">Home</Link>
          <Link to="/movies">All Movies</Link>
          {user && <Link to="/my-collection">My Collection</Link>}
          {user && <Link to="/movies/add">Add Movie</Link>}
          {user ? (
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
