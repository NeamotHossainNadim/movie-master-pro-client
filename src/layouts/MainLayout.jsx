import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white text-center py-4">
        © {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
      </footer>
    </>
  );
};

export default MainLayout;
