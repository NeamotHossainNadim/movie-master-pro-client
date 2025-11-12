import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api"; 

const AddMovie = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.title || !formData.genre || !formData.rating) {
    toast.error("Please fill in required fields: Title, Genre, and Rating.");
    return;
  }

  const newMovie = {
    ...formData,
    addedBy: user?.email,
    rating: parseFloat(formData.rating),
    releaseYear: parseInt(formData.releaseYear),
    duration: parseInt(formData.duration),
  };

  try {
    setLoading(true);

   
    const idToken = await user.getIdToken();

    
    await api.post("/movies", newMovie, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    toast.success("🎬 Movie added successfully!");
    navigate("/my-collection");
  } catch (error) {
    console.error("Add movie error:", error);
    toast.error("Failed to add movie. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Add New Movie
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
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
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required={["title", "genre", "rating"].includes(field.name)}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-gray-600">Plot Summary</label>
          <textarea
            name="plotSummary"
            value={formData.plotSummary}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="3"
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
