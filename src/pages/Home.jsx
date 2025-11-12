import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data.slice(-6).reverse());
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to MovieMaster Pro
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Browse, manage, and organize your favorite movies effortlessly.
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="mt-6 bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-indigo-100 transition"
        >
          Explore All Movies
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Latest Movies
        </h2>

        {movies.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <img
                  src={
                    movie.posterUrl ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{movie.genre}</p>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span> {movie.rating || "N/A"}</span>
                    <span>{movie.releaseYear}</span>
                  </div>

                  <button
                    onClick={() => navigate(`/movies/${movie._id}`)}
                    className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No movies available yet.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
