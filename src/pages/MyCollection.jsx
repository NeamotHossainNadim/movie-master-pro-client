import { useEffect, useState } from "react";
import api from "../utils/api";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";

const MyCollection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies/my");
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch your movies.");
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>
      {movies.length === 0 ? (
        <p className="text-gray-500">You haven’t added any movies yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyCollection;
