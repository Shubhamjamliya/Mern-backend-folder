import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Task<span className="text-gray-800">Manager</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Dashboard
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/add-task"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Add Task
            </Link>
          )}

          <span className="text-gray-600 font-medium">
            👋 {user?.name || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm p-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/add-task"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition"
            >
              Add Task
            </Link>
          )}

          <div className="border-t pt-2 flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              👋 {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
