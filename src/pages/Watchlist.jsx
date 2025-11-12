import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      const res = await api.get(`/watchlist/${user.uid}`);
      setWatchlist(res.data);
    } catch (error) {
      toast.error("Failed to load watchlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user]);

  const removeFromWatchlist = async (id) => {
    try {
      await api.delete(`/watchlist/${id}`);
      setWatchlist(watchlist.filter((item) => item._id !== id));
      toast.success("Removed from Watchlist");
    } catch (error) {
      toast.error("Failed to remove movie.");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-600">Your watchlist is empty. Add some movies!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {watchlist.map((item) => (
            <div key={item._id} className="bg-gray-50 rounded-xl shadow p-4">
              <img
                src={item.movie.posterUrl}
                alt={item.movie.title}
                className="rounded-lg w-full h-64 object-cover"
              />
              <h2 className="text-xl font-semibold mt-3">{item.movie.title}</h2>
              <p className="text-sm text-gray-600">{item.movie.genre}</p>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/movies/${item.movie._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFromWatchlist(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
