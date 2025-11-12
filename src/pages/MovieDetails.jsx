import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        toast.error("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Spinner />;
  if (!movie)
    return (
      <p className="text-center mt-10 text-gray-500">Movie not found.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
      
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        <div className="relative">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-72 object-cover md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <h1 className="absolute bottom-6 left-6 text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            {movie.title}
          </h1>
        </div>

        <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8">
          
          <div className="hidden md:block">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Movie Details
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Genre:</strong> {movie.genre}
              </li>
              <li>
                <strong>Director:</strong> {movie.director || "N/A"}
              </li>
              <li>
                <strong>Cast:</strong> {movie.cast || "N/A"}
              </li>
              <li>
                <strong>Release Year:</strong> {movie.releaseYear}
              </li>
              <li>
                <strong>Duration:</strong> {movie.duration || "N/A"} min
              </li>
              <li>
                <strong>Language:</strong> {movie.language || "N/A"}
              </li>
              <li>
                <strong>Country:</strong> {movie.country || "N/A"}
              </li>
              <li>
                <strong>Rating:</strong>{" "}
                <span className="text-yellow-500 font-semibold">
                   {movie.rating || "N/A"}/10
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Plot Summary
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {movie.plotSummary || "No summary available."}
              </p>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Added by: {movie.addedBy?.displayName || "Unknown"}
            </p>

        
            <div className="mt-8 flex flex-wrap gap-4">
              {user && user.email === movie.addedBy?.email && (
                <Link
                  to={`/movies/update/${movie._id}`}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                >
                   Edit Movie
                </Link>
              )}

              <Link
                to="/movies"
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                ← Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
