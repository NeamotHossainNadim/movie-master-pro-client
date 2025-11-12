import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast"; 

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password)) return toast.error("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(password)) return toast.error("Password must contain a lowercase letter.");

    try {
      await register(name, email, password, photoURL);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed!");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Registered with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-4 transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
