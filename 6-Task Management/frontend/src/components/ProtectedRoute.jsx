import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // If role is specified and doesn't match
  if (role && user.role !== role) return <Navigate to="/" />;

  // Redirect admin to admin dashboard automatically
  if (user.role === "admin" && window.location.pathname === "/") {
    return <Navigate to="/admin/all-tasks" />;
  }

  return children;
};

export default ProtectedRoute;
