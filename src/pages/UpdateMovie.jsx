import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import Spinner from "../components/Spinner";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        toast.error("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...movie,
      rating: parseFloat(movie.rating),
      releaseYear: parseInt(movie.releaseYear),
      duration: parseInt(movie.duration),
    };

    try {
      setUpdating(true);
      await api.put(`/movies/${id}`, updatedData);
      toast.success("Movie updated successfully!");
      navigate("/my-collection");
    } catch (error) {
      toast.error("Failed to update movie.");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Update Movie
      </h1>

      <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Genre", name: "genre", type: "text" },
          { label: "Release Year", name: "releaseYear", type: "number" },
          { label: "Director", name: "director", type: "text" },
          { label: "Cast", name: "cast", type: "text" },
          { label: "Rating (0-10)", name: "rating", type: "number" },
          { label: "Duration (min)", name: "duration", type: "number" },
          { label: "Poster URL", name: "posterUrl", type: "url" },
          { label: "Language", name: "language", type: "text" },
          { label: "Country", name: "country", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-600">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={movie?.[field.name] || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-gray-600">Plot Summary</label>
          <textarea
            name="plotSummary"
            value={movie?.plotSummary || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="3"
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={updating}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
