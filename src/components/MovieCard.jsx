import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      
      
      <div className="relative">
        <img
          src={movie.posterUrl || "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.title}
          className="w-full h-44 sm:h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        
        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shadow">
           {movie.rating ? movie.rating.toFixed(1) : "N/A"}
        </div>
      </div>

      
      <div className="p-3 sm:p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
          {movie.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
          {movie.genre} • {movie.releaseYear}
        </p>

        
        <div className="flex justify-between items-center mt-2">
          <Link
            to={`/movies/${movie._id}`}
            className="text-xs sm:text-sm bg-indigo-600 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-indigo-700 transition"
          >
            Details
          </Link>
          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic">
            {movie.language || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
