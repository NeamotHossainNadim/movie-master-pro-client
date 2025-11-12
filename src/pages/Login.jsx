import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid credentials. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Login to MovieMaster Pro
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
          >
            {loading ? "Please wait..." : "Login with Google"}
          </button>
        </div>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
