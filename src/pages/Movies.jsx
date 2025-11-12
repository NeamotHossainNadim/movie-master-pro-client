import { useEffect, useState } from "react";
import api from "../utils/api";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
        setFilteredMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  // Handle search
  useEffect(() => {
    let results = [...movies];

    if (searchTerm) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year") {
      results.sort((a, b) => b.releaseYear - a.releaseYear);
    } else {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(results);
  }, [searchTerm, sortBy, movies]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          🎥 All Movies
        </h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No movies found.
        </p>
      )}
    </section>
  );
};

export default Movies;
