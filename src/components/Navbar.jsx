import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // for better icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block px-3 py-2 rounded-md text-base md:text-sm font-medium transition ${
            isActive
              ? "text-indigo-600"
              : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
          }`
        }
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `block px-3 py-2 rounded-md text-base md:text-sm font-medium transition ${
            isActive
              ? "text-indigo-600"
              : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
          }`
        }
        onClick={() => setMenuOpen(false)}
      >
        All Movies
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/movies/add"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base md:text-sm font-medium transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Add Movie
          </NavLink>

          <NavLink
            to="/my-collection"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base md:text-sm font-medium transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            My Collection
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        {/* === Logo === */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-indigo-600 flex items-center gap-1"
        >
          🎬 <span className="hidden sm:inline">MovieMaster</span>
        </Link>

        {/* === Desktop Menu === */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks}

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "https://i.ibb.co/2kRcs2D/avatar.png"}
                alt="user"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-indigo-600 text-indigo-600 px-4 py-1.5 rounded-md hover:bg-indigo-50 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* === Mobile Menu Toggle === */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* === Mobile Dropdown === */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md px-4 py-4 space-y-3 transition-all">
          {navLinks}

          {user ? (
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <img
                src={user.photoURL || "https://i.ibb.co/2kRcs2D/avatar.png"}
                alt="user"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white w-full px-3 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-indigo-600 text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-50 transition text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
