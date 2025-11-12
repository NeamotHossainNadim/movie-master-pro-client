import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
