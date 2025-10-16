import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // clear auth session
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6 font-bold text-xl border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/all-tasks"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-semibold" : ""
                  }`
                }
              >
                All Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/add-task"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-semibold" : ""
                  }`
                }
              >
                Add Task
              </NavLink>
            </li>

            {/* Collapsible User Management */}
            <li>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 flex justify-between items-center"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                User Management
                <span>{userMenuOpen ? "▲" : "▼"}</span>
              </button>
              {userMenuOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <NavLink
                      to="/admin/add-user"
                      className={({ isActive }) =>
                        `block px-4 py-1 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-semibold" : ""
                        }`
                      }
                    >
                      Add User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/all-users"
                      className={({ isActive }) =>
                        `block px-4 py-1 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-semibold" : ""
                        }`
                      }
                    >
                      All Users
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>


          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
          {/* Navbar Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
